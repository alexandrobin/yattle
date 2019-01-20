import {
    Types
} from '@foundationjs/persistence'
import Users from '../users'

export default {
    content: Types.String,
    author: {
        type: Types.ObjectId,
        ref: Users.name,
    },
    timestamp: Types.Date,
}