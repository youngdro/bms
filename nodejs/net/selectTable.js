// 选择数据表
module.exports = function() {
    return {
        // 用户信息表
        user: function(db) {
            return db.define("usertb", {
                id: {
                    type: 'serial',
                    key: true
                },
                uid: String,
                username: String,
                password: String,
                name: String,
                phone: String
            });
        },
        // 管理员账户表
        admin: function(db){
            return db.define("admintb", {
                id: {
                    type: 'serial',
                    key: true
                },
                username: String,
                password: String,
            });
        },
        // 书籍信息表
        book: function(db){
            return db.define("booktb", {
                id: {
                    type: 'serial',
                    key: true
                },
                book_number: String,
                book_title: String,
                book_author: String,
                book_category: String,
                book_publisher: String,
                book_img: String,
                book_count: Number,
                book_content: String
            });
        },
        // 借阅记录表
        borrow: function(db){
            return db.define("borrowtb", {
                id: {
                    type: 'serial',
                    key: true
                },
                borrow_number: String,
                borrow_title: String,
                borrow_user: String,
                borrow_uid: String,
                borrow_phone: String,
                borrow_starttime: String,
                borrow_length: Number,
                borrow_status: String,
                borrow_returntime: String
            });
        },
        // 添书记录表
        addbook: function(db){
            return db.define("addbooktb", {
                id: {
                    type: 'serial',
                    key: true
                },
                book_number: String,
                book_img: String,
                book_title: String,
                book_category: String,                
                book_author: String,                
                book_addtime: String
            });
        },
        // 申还记录表
        apply: function(db){
            return db.define("applytb", {
                id: {
                    type: 'serial',
                    key: true
                },
                borrow_number: String,
                borrow_title: String,
                uid: String,
                name: String,
                borrow_starttime: String,
                borrow_length: Number,
                apply_time: String,
            });
        }
    }
}
