import {
    Types
} from '@foundationjs/persistence'

export default {
    username: {
        type: Types.String,
        unique: true,
    },
    displayName: Types.String,
}