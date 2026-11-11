import {z} from 'zod';
export const consentVersion='2026-11-11';
const text=(max:number)=>z.string().trim().min(1,'This field is required.').max(max);
const base={firstName:text(80),lastName:text(80),email:z.email().max(254),phone:z.string().trim().regex(/^\+?[0-9 ()\-.]{7,30}$/,'Enter a phone number with country code.'),citizenship:text(80),residence:text(80),ageBand:z.enum(['18–24','25–34','35–44','45–54','55+']),canadaStatus:z.enum(['Outside Canada','Visitor','Worker','Student','Permanent resident','Other / unsure']),previousRefusal:z.enum(['No','Yes','Prefer to discuss']),notes:z.string().trim().max(2000).default(''),consent:z.literal(true),adult:z.literal(true),terms:z.literal(true)};
export const intakeSchema=z.discriminatedUnion('service',[
 z.object({...base,service:z.literal('Work permit'),education:z.enum(['Secondary school','College / diploma','Bachelor’s degree','Master’s degree or higher','Other']),experience:z.enum(['Less than 1 year','1–2 years','3–5 years','6+ years']),jobOffer:z.enum(['Yes','No','In progress'])}),
 z.object({...base,service:z.literal('Visitor visa'),purpose:z.enum(['Tourism','Visit family or friends','Business visit','Other']),travelMonth:z.string().regex(/^20\d{2}-(0[1-9]|1[0-2])$/),duration:z.enum(['Less than 2 weeks','2–4 weeks','1–3 months','More than 3 months','Not sure yet'])})
]);
export type Intake=z.infer<typeof intakeSchema>;
export const statuses=['received','reviewing','contacted','awaiting_payment','in_progress','closed'] as const;
export const statusLabels:Record<string,string>={received:'Registration received',reviewing:'Under review',contacted:'Follow-up in progress',awaiting_payment:'Service terms confirmed · payment requested',in_progress:'Service in progress',closed:'Intake closed'};
export function validatePayment(session:{payment_status:string;amount_total:number|null;currency:string|null;metadata:Record<string,string>|null},reference:string){return session.payment_status==='paid'&&session.amount_total===62200&&session.currency==='cad'&&session.metadata?.reference===reference;}
