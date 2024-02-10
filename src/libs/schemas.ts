export const _Response = {
    200:{
        type: 'object',
        properties: {
            _token: {type:'string'}, 
            _plain: {type:'array', items:{type:'string'}},
            _avatar: {type: 'string'}
        }
    },
    401:{
        type: 'object',
        properties: {
            _error: {type:'string'}
        }
    },
    400:{
        type: 'object',
        properties: {
            _error: {type:'string'}
        }
    },
}
export const _Body_Signin = {
    properties: {
        name:{type:'string'}, 
        email:{type:'string'}, 
        password:{type:'string'}
    },
    required: ['name', 'email', 'password']
}
export const _Body_Signup = {
    properties: {
        email:{type:'string'}, 
        password:{type:'string'}
    },
    required: ['email', 'password']
}
export const _Body_Verify = {
    properties: {
        token:{type:'string'}
    },
    required: ['token']
}
export const _Body_WithGoogle = {
    properties: {
        name:{type:'string'}, 
        email:{type:'string'}, 
        id:{type:'string'}
    },
    required: ['name', 'email', 'id']
}
export const _Body_ChangeAvatar = {
    properties: {
        token:{type:'string'}, 
        avatar:{type:'string'}
    },
    required: ['token', 'avatar']
}
