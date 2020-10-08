const express = require('express');
const router = express.Router();

const DBHelper = require('./utils/DBHelper');
new DBHelper().getConn();

let suppliers = null

// 查询数据
router.post('/search', (req, res) => {
    let params = req.body;
    const supplier = params.supplier
    const name = params.name
    let sqlStrs = suppliers.map(supplier => `select * from ${supplier} where 品名 like '${supplier}'`)
    // let sqlStr = `select * from ${supplier} where 品名 like '${name}'`;
    // let conn = 
    conn.query(sqlStr, [params.keywords], (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result)
        }
    });
    conn.end();
});
// 查询所有表名
router.get('/suppliers', (req, res) => {
    let sqlStr = "select table_name from information_schema.tables where table_schema='test'"
    // let conn = new DBHelper().getConn();
    conn.query(sqlStr, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            suppliers = result.map(item => item.TABLE_NAME)
            res.json(suppliers)
        }
    });
    conn.end();
})

module.exports = router;