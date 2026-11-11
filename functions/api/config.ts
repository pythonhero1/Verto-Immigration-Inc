import {json,isLocal,type Env} from '../_lib/core';
export const onRequestGet:PagesFunction<Env>=async ctx=>json({registrationAvailable:!!ctx.env.DB&&!!(ctx.env.SITE_ORIGIN||isLocal(ctx.request))&&!!(ctx.env.TURNSTILE_SECRET_KEY||(isLocal(ctx.request)&&ctx.env.ALLOW_LOCAL_INTAKE==='true'))});
