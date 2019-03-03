import {
    Types
} from '@foundationjs/persistence'

export default {
    username: {
        type: Types.String,
        unique: true,
    },
    password:Types.String,
    displayName: Types.String,
}