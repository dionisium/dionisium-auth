export interface user{
    name:string,
    email:string,
    password:string,
    date:Date,
    roles:[string],
    plain:[string],
    viewing:[viewing],
    avatar:string,
    _id:string
}
export interface viewing{
    name:string,
    redirect:string,
    thumnail:string,
    minute:string
}