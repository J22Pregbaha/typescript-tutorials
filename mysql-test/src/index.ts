import * as mysql from 'mysql'

const pool = mysql.createPool({
    user: 'XXXX',
    host: 'XXXX',
    database: 'XXXX',
    password: 'XXXX',
    port: 3306
})

try {
    pool.getConnection(function (err, connection) {
        if (err !== null) throw err
        const sql = "SELECT * from DirectoryPerson WHERE primaryEmail='joshua.pregbaha@XXXXX.com'"
        connection.query(sql, function (error, result) {
            connection.release()
            if (error) throw error
            console.log(`Exists: ${result.length > 0}. Length: ${result.length}`)
        })
    })
} catch (error) {
    console.error(error)
}

/* try {
    pool.getConnection(function (err, connection) {
        if (err) throw err
        console.log("Connected!")
        const sql = "INSERT INTO DirectoryPerson (givenName, familyName, primaryEmail) VALUES ('Joseph', 'Lipton', 'joe.lipton@gmail.com')"
        connection.query(sql, function (error, result) {
            connection.release()
            if (error) throw error
            console.log(`Record created: ${JSON.stringify(result)}`)
        })
    })
} catch (error) {
    console.error(error)
} */