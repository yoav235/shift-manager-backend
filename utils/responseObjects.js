export function successResponseObject(message, data = null) {
    return {
        success: true,
        message: message || 'Success',
        data: data
    };
}

export function errorResponseObject(error, data = null) {
    return {
        success: false,
        error: error || 'אירעה שגיאה בשרת',
        data: data || null
    };
}