cronAdd("start-notify", "*/3 * * * *", () => {
    const currentTime = new Date();
    const tenMinutesLaterTime = new Date(currentTime.getTime() + 10 * 60 * 1000);

    $app.runInTransaction((txDao) => {
        // class not started yet, will be started within 10 minutes and not notified
        const startNotificationNotSent = txDao.findRecordsByFilter(
            "class_logs",
            `start_at < '${tenMinutesLaterTime.toISOString()}' && start_notified = false && started = false`
        )
        for (let record of startNotificationNotSent) {
            txDao.expandRecord(record, ["student"], null)
            const student = record.publicExport().expand.student;
            txDao.expandRecord(record, ["cp_teacher"], null)
            const teacher = record.publicExport().expand.cp_teacher;
            const mobile_no = teacher.get("mobile_no").replace(/\D/g, '');
            const message = `${student.get("nickname")} এর ক্লাস আর কিছুক্ষণ পরে শুরু হবে অনুগ্রহ করে সময় মতো জয়েন করবেন। URL: https://web.ummulquran.live/teacher/class-details/${record.get("id")}`

            const res = $http.send({
                url: "http://104.194.132.235:3000/api/sendText",
                method: "POST",
                body: JSON.stringify({
                    "chatId": `${mobile_no}@c.us`,
                    "text": `${message}`,
                    "session": "default"
                }),
                headers: { "content-type": "application/json" },
                timeout: 20 // in seconds
            });
            
            if (res.statusCode === 201) {
                const found = txDao.findRecordById("class_logs", record.get("id"))
                found.set("start_notified", true)
                txDao.save(found)
            }
        }
    })
})

cronAdd("finish-notify", "*/10 * * * *", () => {
    const currentTime = new Date();
    const tenMinutesBeforeTime = new Date(currentTime.getTime() - 10 * 60 * 1000);

    $app.runInTransaction((txDao) => {
        // class not finished yet and not notified
        const finishNotificationNotSent = txDao.findRecordsByFilter(
            "class_logs",
            `finish_at < '${tenMinutesBeforeTime.toISOString()}' && started = true && finish_notified = false && finished = false`
        )
        for (let fd of finishNotificationNotSent) {
            txDao.expandRecord(record, ["student"], null)
            const student = record.publicExport().expand.student;
            txDao.expandRecord(record, ["cp_teacher"], null)
            const teacher = record.publicExport().expand.cp_teacher;
            const mobile_no = teacher.get("mobile_no").replace(/\D/g, '');
            const message = `${student.get("nickname")} এর ক্লাস আপনি এখনো ক্লোজ করেননি অনুগ্রহ করে অতি দ্রুত সাবমিট রিপোর্টে ক্লিক করে ক্লাসটি ক্লোজ করুন। URL: https://web.ummulquran.live/teacher/class-details/${record.get("id")}`

            // console.log(message)
            const res = $http.send({
                url: "http://104.194.132.235:3000/api/sendText",
                method: "POST",
                body: JSON.stringify({
                    "chatId": `${mobile_no}@c.us`,
                    "text": `${message}`,
                    "session": "default"
                }),
                headers: { "content-type": "application/json" },
                timeout: 20 // in seconds
            });

            if (res.statusCode === 201) {
                const found = txDao.findRecordById("class_logs", fd.get("id"))
                found.set("finish_notified", true)
                txDao.save(found)
            }
        }
    })
})

routerAdd("POST", "/api/send-wh-message", (c) => {
    const payload = c.requestInfo().body

    // allow admin only

    const admin = !!c.auth.get("superadmin")
    if (!admin) throw ForbiddenError()

    if (!["TEACHER", "STUDENT"].includes(payload.type)) throw ForbiddenError();

    const data = {
        id: "",
        nickname: "",
        whatsapp_no: "",
        year: "",
        month: "",
        due_amount: "",
        paid_amount: ""
    }

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    if (payload.type == "TEACHER") {
        const record = $app.findFirstRecordByFilter(
            "teacher_invoices",
            `id = '${payload.id}'`
        )
        $app.expandRecord(record, ["teacher"], null)

        if (record == null) {
            throw new ForbiddenError()
        }

        data.nickname = record.publicExport().expand.teacher.publicExport().nickname
        data.whatsapp_no = record.publicExport().expand.teacher.publicExport().mobile_no.replace(/\D/g, '')
        data.year = record.publicExport().year
        data.month = months[record.publicExport().month - 1]
        data.due_amount = record.publicExport().due_amount
        data.id = record.publicExport().id
    }

    if (payload.type == "STUDENT") {
        const record = $app.findFirstRecordByFilter(
            "student_invoices",
            `id = '${payload.id}'`
        )
        $app.expandRecord(record, ["student"], null)

        if (record == null) {
            throw new ForbiddenError()
        }

        data.nickname = record.publicExport().expand.student.publicExport().nickname
        data.whatsapp_no = record.publicExport().expand.student.publicExport().mobile_no.replace(/\D/g, '')
        data.year = record.publicExport().year
        data.month = months[record.publicExport().month - 1]
        data.due_amount = record.publicExport().due_amount
        data.id = record.publicExport().id
    }

    const message = payload.message
        .replaceAll("{{nickname}}", data.nickname)
        .replaceAll("{{whatsapp_no}}", data.whatsapp_no)
        .replaceAll("{{year}}", data.year)
        .replaceAll("{{month}}", data.month)
        .replaceAll("{{due_amount}}", data.due_amount)
        .replaceAll("{{paid_amount}}", data.paid_amount)
        .replaceAll("{{id}}", data.id)

    let error = true
    const res = $http.send({
        url: "http://104.194.132.235:3000/api/sendText",
        method: "POST",
        body: JSON.stringify({
            "chatId": `${data.whatsapp_no}@c.us`,
            "text": `${message}`,
            "session": "default"
        }),
        headers: { "content-type": "application/json" },
        timeout: 20 // in seconds
    });
    if (res.statusCode === 201) error = false;

    const updateData = {
        table: "",
        id: "",
        status: ""
    }
    updateData.id = data.id
    if (payload.type == "TEACHER") updateData.table = "teacher_invoices";
    if (payload.type == "STUDENT") updateData.table = "student_invoices";
    if (error) updateData.status = "ERROR"
    if (!error) updateData.status = "SUCCESS"

    const record = $app.findRecordById(updateData.table, updateData.id)
    record.set("status", updateData.status)
    $app.save(record)

    c.json(200, { "message": "Request processed!" });
});

routerAdd("POST", "/api/class-logs/create-by-routine", (c) => {
    const payload = c.requestInfo().body

    const teacherByStudent = $app.findFirstRecordByData("students", "id", payload.student).get("teacher")
    const teacherByAuth = $app.findFirstRecordByData("teachers", "user", c.auth.get("id")).get("id")

    const canAccess = teacherByStudent == teacherByAuth
    if (!canAccess) {
        throw new ForbiddenError()
    }

    // helpers

    const dayNames = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ];

    const getDatesByWeekday = ({
        start_date,
        finish_date,
        weekday_index,
        start_at,
        finish_at,
        offset_hh_mm
    }) => {
        const result = [];
        let currentDate = new Date(start_date);
        let finishDate = new Date(finish_date);

        while (currentDate <= finishDate) {
            const dayIndex = currentDate.getDay();

            if (weekday_index === dayIndex) {
                result.push({
                    start_at: `${currentDate.toISOString().slice(0, 10)} ${start_at}:00.000${offset_hh_mm}`,
                    finish_at: `${currentDate.toISOString().slice(0, 10)} ${finish_at}:00.000${offset_hh_mm}`,
                });
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return result;
    };

    // validation start

    const errorRoutines = payload.routine.filter(routine =>
        Number(routine.finish_at?.replace(":", "")) != 0 &&
        (Number(routine.finish_at?.replace(":", "")) < Number(routine.start_at.replace(":", "")))
    )

    if (errorRoutines.length > 0) {
        const errorDays = errorRoutines.map(e => dayNames[e.weekday_index]).join(", ")
        throw new ForbiddenError("Fix class times for " + errorDays)
    }

    const start_date = new Date(payload.start_date)
    const finish_date = new Date(payload.finish_date)
    const yesterday_date = new Date(new Date().setDate(new Date().getDate() - 1))

    if ((finish_date.getTime() <= start_date.getTime()) || start_date.getTime() < yesterday_date.getTime()) {
        throw new ForbiddenError("Fix date range.")
    }

    const days_difference = (finish_date.getTime() - start_date.getTime()) / (1000 * 3600 * 24);
    if (days_difference > 366) {
        throw new ForbiddenError("You can create routine for maximum 1 year")
    }

    // validation finish

    const payloads = payload.routine.flatMap(routine =>
        getDatesByWeekday({
            start_date: payload.start_date,
            finish_date: payload.finish_date,
            weekday_index: routine.weekday_index,
            start_at: routine.start_at,
            finish_at: routine.finish_at,
            offset_hh_mm: payload.offset_hh_mm
        })
    );

    const collection = $app.findCollectionByNameOrId("class_logs")

    $app.runInTransaction((txDao) => {
        if (payload.new_routine) {
            const start_at_str = `${start_date.toISOString().slice(0, 10)} 00:00:00.000${payload.offset_hh_mm}`
            // const finish_at_str = `${finish_date.toISOString().slice(0, 10)} 00:00:00.000${payload.offset_hh_mm}`;

            const records = $app.findRecordsByFilter(
                "class_logs",
                // `start_at >= '${start_at_str}' && start_at <= '${finish_at_str}' && finished = false`
                `start_at >= '${start_at_str}' && finished = false && student.id = '${payload.student}'`
            )
            for (let record of records) {
                txDao.deleteRecord(record)
            }
        }
        let checkData = null;

        for (let data of payloads) {
            const record = new Record(collection)

            record.set("cp_teacher", teacherByAuth)
            record.set("student", payload.student)
            record.set("start_at", data.start_at)
            record.set("finish_at", data.finish_at)

            if (checkData == null) checkData = record;

            txDao.save(record)
        }
    })

    return c.json(200, { "message": "Class log created" })
})

routerAdd("POST", "/api/class-logs/create-by-dates", (c) => {
    const payload = c.requestInfo().body

    const teacherByStudent = $app.findFirstRecordByData("students", "id", payload.student).get("teacher")
    const teacherByAuth = $app.findFirstRecordByData("teachers", "user", c.auth.get("id")).get("id")

    const canAccess = teacherByStudent == teacherByAuth
    if (!canAccess) {
        throw new ForbiddenError()
    }

    // helpers

    const getDate = ({
        date,
        start_at,
        finish_at,
        offset_hh_mm
    }) => {
        const currentDate = new Date(date)
        return {
            start_at: `${currentDate.toISOString().slice(0, 10)} ${start_at}:00.000${offset_hh_mm}`,
            finish_at: `${currentDate.toISOString().slice(0, 10)} ${finish_at}:00.000${offset_hh_mm}`,
        };
    };

    // validation start

    const errorRoutines = payload.routine.filter(routine =>
        Number(routine.finish_at?.replace(":", "")) != 0 &&
        (Number(routine.finish_at?.replace(":", "")) < Number(routine.start_at.replace(":", "")))
    )

    if (errorRoutines.length > 0) {
        const errorDays = errorRoutines.map(e => dayNames[e.weekday_index]).join(", ")
        throw new ForbiddenError("Fix class times for " + errorDays)
    }

    // validation finish

    const payloads = payload.routine.flatMap(routine =>
        getDate({
            date: routine.date,
            start_at: routine.start_at,
            finish_at: routine.finish_at,
            offset_hh_mm: payload.offset_hh_mm
        })
    );
    const collection = $app.findCollectionByNameOrId("class_logs")

    $app.runInTransaction((txDao) => {
        let checkData = null;

        for (let data of payloads) {
            const record = new Record(collection)

            record.set("cp_teacher", teacherByAuth)
            record.set("student", payload.student)
            record.set("start_at", data.start_at)
            record.set("finish_at", data.finish_at)

            if (checkData == null) checkData = record;

            txDao.save(record)
        }
    })

    return c.json(200, { "message": "Class log created" })
})

routerAdd("POST", "/api/class-logs/start", (c) => {
    const payload = c.requestInfo().body

    const id = payload.id
    if (!id) throw ForbiddenError();

    // helpers

    function getCurrentTime() {
        const now = new Date();
        const date = now.toISOString().slice(0, 10); // "YYYY-MM-DD"
        const time = now.toISOString().slice(11, 23); // "HH:mm:ss.SSS"
        return `${date} ${time}Z`;
    }

    const record = $app.findRecordById("class_logs", id)

    $app.runInTransaction((txDao) => {
        record.set("started", true)
        record.set("start_at", getCurrentTime())

        txDao.save(record)

        const teacherByStudent = $app.findFirstRecordByData("students", "id", record.get("student")).get("teacher")
        const teacherByAuth = $app.findFirstRecordByData("teachers", "user", c.auth.get("id")).get("id")

        const canAccess = teacherByStudent == teacherByAuth
        if (!canAccess) {
            throw new ForbiddenError()
        }

    })

    return c.json(200, { "message": "Class log started" })
})

routerAdd("POST", "/api/class-logs/finish", (c) => {
    const payload = c.requestInfo().body

    const id = payload.id
    if (!id) throw ForbiddenError();

    const feedback = payload.feedback
    if (!feedback || feedback.length < 10) throw ForbiddenError();

    const monthly_package_id = payload.monthly_package_id ?? "";

    // helpers

    function getCurrentTime() {
        const now = new Date();
        const date = now.toISOString().slice(0, 10); // "YYYY-MM-DD"
        const time = now.toISOString().slice(11, 23); // "HH:mm:ss.SSS"
        return `${date} ${time}Z`;
    }

    const record = $app.findRecordById("class_logs", id)

    const student = $app.findRecordById("students", record.get("student"))
    const monthly_package = $app.findRecordById("monthly_packages", monthly_package_id.length > 0 ? monthly_package_id : student.get("monthly_package"))

    $app.runInTransaction((txDao) => {
        record.set("feedback", feedback)
        record.set("cp_teacher", student.get("teacher"))
        record.set("cp_class_mins", monthly_package.get("class_mins"))
        record.set("cp_teachers_price", monthly_package.get("teachers_price"))
        record.set("cp_students_price", monthly_package.get("students_price"))
        record.set("started", true)
        record.set("finished", true)
        record.set("finish_at", getCurrentTime())

        txDao.save(record)

        const teacherByStudent = $app.findFirstRecordByData("students", "id", record.get("student")).get("teacher")
        const teacherByAuth = $app.findFirstRecordByData("teachers", "user", c.auth.get("id")).get("id")

        const canAccess = teacherByStudent == teacherByAuth
        if (!canAccess) {
            throw new ForbiddenError()
        }

    })

    return c.json(200, { "message": "Class log finished" })
})

routerAdd("POST", "/api/generate-student-invoices", (c) => {
    const payload = c.requestInfo().body

    // allow admin only
    const admin = !!c.auth.get("superadmin")
    if (!admin) throw ForbiddenError()

    const yyyy_mm_dd = new Date().toISOString().slice(0, 10)
    const hh_mm_ss = new Date().toISOString().slice(11, 23)
    const date = `${yyyy_mm_dd} ${hh_mm_ss}Z`;

    const filter = payload.students && payload.students.length > 0 ? `${payload.students.map(e => `id = '${e}'`).join(" || ")}` : `id != 0`

    const student_invoices = $app.findCollectionByNameOrId("student_invoices")
    const students = $app.findRecordsByFilter(
        "students",
        filter
    )

    const parent_invoices = $app.findCollectionByNameOrId("invoices")

    $app.runInTransaction((txDao) => {
        const unq_id = Date.now()
        const parent_record = new Record(parent_invoices)
        parent_record.set("unq_id", unq_id)
        parent_record.set("type", "STUDENT")
        txDao.save(parent_record)
        const parent_invoice = txDao.findRecordsByFilter(
            "invoices",
            `unq_id = '${unq_id}'`,
            "-created",
            1,
            0,
        )
        const parent_invoice_id = parent_invoice[0].id


        for (let student of students) {
            // clear unfinished class logs
            const unfinished_class_logs = txDao.findRecordsByFilter(
                "class_logs",
                `start_at < '${date}' && finished = false && student.id = '${student.get("id")}'`
            )
            for (let r of unfinished_class_logs) {
                txDao.deleteRecord(r)
            }

            // filter class logs by date and student
            const student_class_logs = txDao.findRecordsByFilter(
                "class_logs",
                `start_at < '${date}' && finished = true && student_invoice = '' && student.id = '${student.get("id")}'`
            )

            // calculate due amount
            const due_amount = student_class_logs.reduce((sum, record) => sum + record.publicExport().cp_students_price, 0);

            // no invoice for zero amount
            if (due_amount <= 0) continue;

            // create invoice
            const record = new Record(student_invoices)
            record.set("student", student.get("id"))
            record.set("due_amount", due_amount)
            record.set("invoice", parent_invoice_id)
            txDao.save(record)

            // find the invoice
            const invoices = txDao.findRecordsByFilter(
                "student_invoices",
                `student = '${student.get("id")}'`,
                "-created",
                1,
                0,
            )

            // update class logs with invoice id
            for (let class_log of student_class_logs) {
                const found = txDao.findRecordById("class_logs", class_log.get("id"))
                found.set("student_invoice", invoices[0].id)
                txDao.save(found)
            }
        }
    })

    return c.json(200, { "message": "Invoices Issued" })
})

routerAdd("POST", "/api/generate-teacher-invoices", (c) => {
    const payload = c.requestInfo().body

    // allow admin only
    const admin = !!c.auth.get("superadmin")
    if (!admin) throw ForbiddenError()

    const yyyy_mm_dd = new Date().toISOString().slice(0, 10)
    const hh_mm_ss = new Date().toISOString().slice(11, 23)
    const date = `${yyyy_mm_dd} ${hh_mm_ss}Z`;

    const filter = payload.teachers && payload.teachers.length > 0 ? `${payload.teachers.map(e => `id = '${e}'`).join(" || ")}` : `id != 0`

    const teacher_invoices = $app.findCollectionByNameOrId("teacher_invoices")
    const teachers = $app.findRecordsByFilter(
        "teachers",
        filter
    )

    const parent_invoices = $app.findCollectionByNameOrId("invoices")

    $app.runInTransaction((txDao) => {
        const unq_id = Date.now()
        const parent_record = new Record(parent_invoices)
        parent_record.set("unq_id", unq_id)
        parent_record.set("type", "TEACHER")
        txDao.save(parent_record)
        const parent_invoice = txDao.findRecordsByFilter(
            "invoices",
            `unq_id = '${unq_id}'`,
            "-created",
            1,
            0,
        )
        const parent_invoice_id = parent_invoice[0].id

        for (let teacher of teachers) {
            // clear unfinished class logs
            const unfinished_class_logs = txDao.findRecordsByFilter(
                "class_logs",
                `start_at < '${date}' && finished = false && student.teacher.id = '${teacher.get("id")}'`
            )
            for (let r of unfinished_class_logs) {
                txDao.deleteRecord(r)
            }

            // filter class logs by date and student
            const teacher_class_logs = txDao.findRecordsByFilter(
                "class_logs",
                `start_at < '${date}' && finished = true && teacher_invoice = '' && student.teacher.id = '${teacher.get("id")}'`
            )

            // calculate due amount
            const due_amount = teacher_class_logs.reduce((sum, record) => sum + record.publicExport().cp_teachers_price, 0);

            // no invoice for zero amount
            if (due_amount <= 0) continue;

            // create invoice
            const record = new Record(teacher_invoices)
            record.set("teacher", teacher.get("id"))
            record.set("due_amount", due_amount)
            record.set("invoice", parent_invoice_id)
            txDao.save(record)

            // find the invoice
            const invoices = txDao.findRecordsByFilter(
                "teacher_invoices",
                `teacher = '${teacher.get("id")}'`,
                "-created",
                1,
                0,
            )

            // update class logs with invoice id
            for (let class_log of teacher_class_logs) {
                const found = txDao.findRecordById("class_logs", class_log.get("id"))
                found.set("teacher_invoice", invoices[0].id)
                txDao.save(found)
            }
        }
    })

    return c.json(200, { "message": "Invoices Issued" })
})

routerAdd("GET", "/api/get-student-invoices", (c) => {
    const user_id = c.auth.get("id");

    const invoices = $app.findRecordsByFilter(
        "student_invoices",
        `student.user.id = '${user_id}'`
    )

    const res = []

    for (let invoice of invoices) {
        const records = $app.findRecordsByFilter(
            "class_logs",
            `student_invoice = '${invoice.get("id")}'`
        )

        res.push({
            "id": invoice.get("id"),
            "due_amount": invoice.get("due_amount"),
            "paid_amount": invoice.get("paid_amount"),
            "created": invoice.get("created"),
            "total_classes": records.length
        })
    }

    return c.json(200, res)
})

routerAdd("GET", "/api/get-teacher-invoices", (c) => {
    const user_id = c.auth.get("id");

    const invoices = $app.findRecordsByFilter(
        "teacher_invoices",
        `teacher.user.id = '${user_id}'`
    )

    const res = []

    for (let invoice of invoices) {
        const records = $app.findRecordsByFilter(
            "class_logs",
            `teacher_invoice = '${invoice.get("id")}'`
        )

        res.push({
            "id": invoice.get("id"),
            "due_amount": invoice.get("due_amount"),
            "paid_amount": invoice.get("paid_amount"),
            "created": invoice.get("created"),
            "total_classes": records.length
        })
    }

    return c.json(200, res)
})

routerAdd("GET", "/api/get-student-invoices/:id", (c) => {
    const user_id = c.auth.get("id");

    // filter by matching student and id

    const invoice = $app.findFirstRecordByFilter(
        "student_invoices",
        `student.user.id = '${user_id}' && id = '${c.pathParam("id")}'`
    )

    if (invoice == null) {
        throw new ForbiddenError()
    }

    const records = $app.findRecordsByFilter(
        "class_logs",
        `student_invoice = '${c.pathParam("id")}'`
    )
    $app.expandRecords(records, ["student"], null)

    const logs = []
    records.forEach(record => logs.push({
        class_mins: record.publicExport().cp_class_mins,
        students_price: record.publicExport().cp_students_price
    }))

    // Map to store unique combinations of class_mins and students_price
    const uniqueLogsMap = new Map();

    logs.forEach(log => {
        const key = `${log.class_mins}-${log.students_price}`;
        if (uniqueLogsMap.has(key)) {
            uniqueLogsMap.set(key, uniqueLogsMap.get(key) + 1);
        } else {
            uniqueLogsMap.set(key, 1);
        }
    });

    // Convert the map into an array of unique combinations and their counts
    const uniqueLogsArray = Array.from(uniqueLogsMap, ([key, count]) => {
        const [class_mins, students_price] = key.split('-');
        return { class_mins: Number(class_mins), students_price: Number(students_price), total_classes: count };
    });

    return c.json(200, {
        "id": invoice.get("id"),
        "paid_amount": invoice.get("paid_amount"),
        "due_amount": invoice.get("due_amount"),
        "created": invoice.get("created"),
        "class_logs": uniqueLogsArray,
    })
})

routerAdd("GET", "/api/get-teacher-invoices/:id", (c) => {
    const user_id = c.auth.get("id");

    // filter by matching teacher and id

    const invoice = $app.findFirstRecordByFilter(
        "teacher_invoices",
        `teacher.user.id = '${user_id}' && id = '${c.pathParam("id")}'`
    )

    if (invoice == null) {
        throw new ForbiddenError()
    }

    const records = $app.findRecordsByFilter(
        "class_logs",
        `teacher_invoice = '${c.pathParam("id")}'`
    )
    $app.expandRecords(records, ["student"], null)

    const logs = []
    records.forEach(record => logs.push({
        class_mins: record.publicExport().cp_class_mins,
        teachers_price: record.publicExport().cp_teachers_price
    }))

    // Map to store unique combinations of class_mins and students_price
    const uniqueLogsMap = new Map();

    logs.forEach(log => {
        const key = `${log.class_mins}-${log.teachers_price}`;
        if (uniqueLogsMap.has(key)) {
            uniqueLogsMap.set(key, uniqueLogsMap.get(key) + 1);
        } else {
            uniqueLogsMap.set(key, 1);
        }
    });

    // Convert the map into an array of unique combinations and their counts
    const uniqueLogsArray = Array.from(uniqueLogsMap, ([key, count]) => {
        const [class_mins, teachers_price] = key.split('-');
        return { class_mins: Number(class_mins), teachers_price: Number(teachers_price), total_classes: count };
    });

    return c.json(200, {
        "id": invoice.get("id"),
        "paid_amount": invoice.get("paid_amount"),
        "due_amount": invoice.get("due_amount"),
        "created": invoice.get("created"),
        "class_logs": uniqueLogsArray,
    })
})

routerAdd("GET", "/api/get-invoiced-students", (c) => {
    // allow admin only

    const admin = !!c.auth.get("superadmin")
    if (!admin) throw ForbiddenError()

    const result = arrayOf(new DynamicModel({
        "id": "",
        "nickname": "",
        "mobile_no": "",
        "last_invoiced_at": "",
    }))

    $app.db()
        .newQuery("SELECT s.id, s.nickname, s.mobile_no,  COALESCE(si.created, '') AS last_invoiced_at FROM students s LEFT JOIN student_invoices si ON si.student = s.id AND si.created = ( SELECT MAX(si2.created) FROM student_invoices si2 WHERE si2.student = s.id )")
        .all(result)

    return c.json(200, result)
})

routerAdd("GET", "/api/get-invoiced-teachers", (c) => {
    // allow admin only

    const admin = !!c.auth.get("superadmin")
    if (!admin) throw ForbiddenError()

    const result = arrayOf(new DynamicModel({
        "id": "",
        "nickname": "",
        "mobile_no": "",
        "last_invoiced_at": "",
    }))

    $app.db()
        .newQuery("SELECT t.id, t.nickname, t.mobile_no, COALESCE(ti.created, '') AS last_invoiced_at FROM teachers t LEFT JOIN teacher_invoices ti ON ti.teacher = t.id AND ti.created = ( SELECT MAX(ti2.created) FROM teacher_invoices ti2 WHERE ti2.teacher = t.id )")
        .all(result)

    return c.json(200, result)
})

routerAdd("DELETE", "/api/invoices/:id", (c) => {
    const invoice = $app.findFirstRecordByFilter(
        "invoices",
        `id = '${c.pathParam("id")}'`
    )

    if (invoice == null) {
        throw new ForbiddenError()
    }

    $app.runInTransaction((txDao) => {
        if (invoice.get("type") == "TEACHER") {
            const records = $app.findRecordsByFilter(
                "teacher_invoices",
                `invoice.id = '${c.pathParam("id")}'`
            )
            for (let record of records) {
                txDao.deleteRecord(record)
            }
        }

        if (invoice.get("type") == "STUDENT") {
            const records = txDao.findRecordsByFilter(
                "student_invoices",
                `invoice.id = '${c.pathParam("id")}'`
            )
            for (let record of records) {
                txDao.deleteRecord(record)
            }
        }

        txDao.deleteRecord(invoice)

    })

    return c.json(200, { "message": "Invoice deleted" })
})

// HTML render

routerAdd("GET", "/student-receipt/:id", (c) => {
    const invoice = $app.findFirstRecordByFilter(
        "student_invoices",
        `id = '${c.pathParam("id")}'`
    )

    if (invoice == null) {
        throw new ForbiddenError()
    }

    $app.expandRecord(invoice, ["student"], null)

    const records = $app.findRecordsByFilter(
        "class_logs",
        `student_invoice = '${c.pathParam("id")}'`
    )

    const logs = []
    records.forEach(record => logs.push({
        class_mins: record.publicExport().cp_class_mins,
        students_price: record.publicExport().cp_students_price
    }))

    // Map to store unique combinations of class_mins and students_price
    const uniqueLogsMap = new Map();

    logs.forEach(log => {
        const key = `${log.class_mins}-${log.students_price}`;
        if (uniqueLogsMap.has(key)) {
            uniqueLogsMap.set(key, uniqueLogsMap.get(key) + 1);
        } else {
            uniqueLogsMap.set(key, 1);
        }
    });

    // Convert the map into an array of unique combinations and their counts
    const uniqueLogsArray = Array.from(uniqueLogsMap, ([key, count]) => {
        const [class_mins, students_price] = key.split('-');
        return {
            class_mins: Number(class_mins),
            unit_price: Number(students_price),
            total_classes: count,
            total_price: count * Number(students_price)
        };
    });

    const html = $template.loadFiles(
        `${__hooks}/views/layout.html`,
        `${__hooks}/views/student-receipt.html`,
    ).render({
        "id": invoice.get("id"),
        "date": invoice.publicExport().created.toString().slice(0, 10),
        "nickname": invoice.publicExport().expand.student.publicExport().nickname,
        "paid_amount": invoice.get("paid_amount"),
        "due_amount": invoice.get("due_amount"),
        "created": invoice.get("created"),
        "class_logs": uniqueLogsArray,
        "type": "Student"
    })

    return c.html(200, html)
})

routerAdd("GET", "/teacher-receipt/:id", (c) => {
    const invoice = $app.findFirstRecordByFilter(
        "teacher_invoices",
        `id = '${c.pathParam("id")}'`
    )

    if (invoice == null) {
        throw new ForbiddenError()
    }

    $app.expandRecord(invoice, ["teacher"], null)

    const records = $app.findRecordsByFilter(
        "class_logs",
        `teacher_invoice = '${c.pathParam("id")}'`
    )

    const logs = []
    records.forEach(record => logs.push({
        class_mins: record.publicExport().cp_class_mins,
        teachers_price: record.publicExport().cp_teachers_price
    }))

    // Map to store unique combinations of class_mins and students_price
    const uniqueLogsMap = new Map();

    logs.forEach(log => {
        const key = `${log.class_mins}-${log.teachers_price}`;
        if (uniqueLogsMap.has(key)) {
            uniqueLogsMap.set(key, uniqueLogsMap.get(key) + 1);
        } else {
            uniqueLogsMap.set(key, 1);
        }
    });

    // Convert the map into an array of unique combinations and their counts
    const uniqueLogsArray = Array.from(uniqueLogsMap, ([key, count]) => {
        const [class_mins, teachers_price] = key.split('-');
        return {
            class_mins: Number(class_mins),
            unit_price: Number(teachers_price),
            total_classes: count,
            total_price: count * Number(teachers_price)
        };
    });

    const html = $template.loadFiles(
        `${__hooks}/views/layout.html`,
        `${__hooks}/views/teacher-receipt.html`,
    ).render({
        "id": invoice.get("id"),
        "date": invoice.publicExport().created.toString().slice(0, 10),
        "nickname": invoice.publicExport().expand.teacher.publicExport().nickname,
        "paid_amount": invoice.get("paid_amount"),
        "due_amount": invoice.get("due_amount"),
        "created": invoice.get("created"),
        "class_logs": uniqueLogsArray,
        "type": "Teacher"
    })

    return c.html(200, html)
})