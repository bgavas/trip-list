module.exports = {

    AUTHENTICATION_FAILED: {
        code: 1000,
        message: {
            tr: 'Lüften sisteme giriş yapın.',
            en: 'Please login to the system'
        }
    },
    USER_NOT_FOUND: {
        code: 1001,
        message: {
            tr: 'Böyle bir kullanıcı bulunamadı.',
            en: 'No user found with this username'
        }
    },
    INCORRECT_CREDENTIALS: {
        code: 1002,
        message: {
            tr: 'Şifre veya kullanıcı adı hatalı',
            en: 'Password or username is wrong'
        }
    },
    UNKNOWN_ERROR: {
        code: 4000,
        message: {
            tr: 'Bilinmeyen bir hata',
            en: 'Unknown error'
        }
    },
    INTERNAL_SERVER_ERROR: {
        code: 5000,
        message: {
            tr: 'Sunucu hatası',
            en: 'Internal server error'
        }
    },

}