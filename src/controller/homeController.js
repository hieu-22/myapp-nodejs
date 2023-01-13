const pool = require("../configs/connectDB")


let getHomePage = async (req, res) => {
    let data;
    // pool.query(
    //     `SELECT
    //         b.id AS "Band ID",
    //         b.name AS "Band Name",
    //         a.name AS "Albums's Name",
    //         a.release_year AS "Release Year"
    //     FROM bands AS b
    //     LEFT JOIN albums AS a ON a.band_id = b.id;`,
    //     function (err, results, fields) {
    //         console.log('>>> check mysql')
    //         data = results
    //         // return res.render('index', {dataBands: data})
    //     })
    const [rows, fields] = await pool.execute(
            `SELECT
                    b.id AS "Band ID",
                    b.name AS "Band Name",
                    a.name AS "Albums's Name",
                    a.release_year AS "Release Year"
            FROM bands AS b 
            INNER JOIN albums AS a ON a.band_id = b.id;`
    );
    return res.render('index', {dataBands: rows})
}

let getDetailsPage = async (req, res) => {
    let [user]= await pool.execute(
        `SELECT
            b.id AS "Band ID",
            b.name AS "Band Name",
            a.name AS "Albums's Name",
            a.release_year AS "Release Year"
        FROM bands AS b
        LEFT JOIN albums AS a ON a.band_id = b.id
        WHERE b.id = ?`, [req.params.bandID])
    return res.send(JSON.stringify(user))
}

let createNewBands = async (req, res) => {
    let {bandName, AlbumName, releaseYear} = req.body
    await pool.execute(
        `INSERT INTO bands(name) values(?);`, [bandName]
    )
    let [bandId] = await pool.execute(`SELECT id FROM bands WHERE name = ?;`, [bandName])
    await pool.execute(
        `INSERT INTO albums(name, release_year, band_id) values(?, ?, ?);`, [AlbumName, releaseYear, bandId[0]['id']]
    )
    return res.redirect('/')
}

let deleteBand = async (req, res) => {
    let bandInfor = req.body
    await pool.execute(`SET FOREIGN_KEY_CHECKS=0`)
    await pool.execute(
        `DELETE FROM bands WHERE id = ?`, [bandInfor.bandId]
    )
    await pool.execute(`SET FOREIGN_KEY_CHECKS=1`)
    return res.redirect('/')
}

let getEditPage = async (req, res) => {
    let id = req.params.bandId
    let [user] = await pool.query(
        `SELECT
            b.id AS "Band ID",
            b.name AS "Band Name",
            a.name AS "Albums's Name",
            a.release_year AS "Release Year"
        FROM bands AS b 
        INNER JOIN albums AS a ON a.band_id = b.id
        WHERE b.id = ?;`, [id])
    return res.render('update', { dataUser: user })
}

let updateBands = async (req, res) => {
    let {BandId, bandName, AlbumName, releaseYear} = req.body
    await pool.query(
        `update bands set name = ? where id = ?`// update band information
    , [bandName, BandId]
    )
    await pool.query(
        `update albums set name = ?, release_year = ? where band_id = ?`// update band information
    , [AlbumName, releaseYear, BandId]
    )
    return res.redirect('/')
}

module.exports = { 
    getHomePage,
    getDetailsPage,
    createNewBands,
    deleteBand,
    getEditPage,
    updateBands
}

