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
    MISSING_FIELDS: {
        code: 1003,
        message: {
            tr: 'Lütfen gerekli bütün alanları doldurun',
            en: 'Please fill all the necessary fields'
        }
    },
    INCORRECT_DATE: {
        code: 1004,
        message: {
            tr: 'Lütfen geçerli bir tarih girin',
            en: 'Please enter a valid date'
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