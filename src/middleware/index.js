'use strict';

import compose from 'koa-compose';
import wechat from './wechat';
import checkauth from './checkauth';

export default function middleware() {
    return compose(
        [
            wechat(),
            checkauth()
        ]
    )
}