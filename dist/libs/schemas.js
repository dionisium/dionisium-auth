"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._Body_ChangeAvatar = exports._Body_WithGoogle = exports._Body_Verify = exports._Body_Signup = exports._Body_Signin = exports._Response = void 0;
exports._Response = {
    200: {
        type: 'object',
        properties: {
            _token: { type: 'string' },
            _plain: { type: 'array', items: { type: 'string' } },
            _avatar: { type: 'string' }
        }
    },
    401: {
        type: 'object',
        properties: {
            _error: { type: 'string' }
        }
    },
    400: {
        type: 'object',
        properties: {
            _error: { type: 'string' }
        }
    },
};
exports._Body_Signin = {
    properties: {
        name: { type: 'string' },
        email: { type: 'string' },
        password: { type: 'string' }
    },
    required: ['name', 'email', 'password']
};
exports._Body_Signup = {
    properties: {
        email: { type: 'string' },
        password: { type: 'string' }
    },
    required: ['email', 'password']
};
exports._Body_Verify = {
    properties: {
        token: { type: 'string' }
    },
    required: ['token']
};
exports._Body_WithGoogle = {
    properties: {
        name: { type: 'string' },
        email: { type: 'string' },
        id: { type: 'string' }
    },
    required: ['name', 'email', 'id']
};
exports._Body_ChangeAvatar = {
    properties: {
        token: { type: 'string' },
        avatar: { type: 'string' }
    },
    required: ['token', 'avatar']
};
//# sourceMappingURL=schemas.js.map