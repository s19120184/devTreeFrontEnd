

export type User={
    name: string;
    email: string;
    handle: string;
    _id: string;
    description: string;
    image:string
    links:string;
}

export type userHandle=Pick<User, 'handle'|'description'|'image'|'links' |'name'>

export type EditFormUser= Pick<User ,'handle'| 'description'>;

export type RegisterForm =Pick<User, 'handle'| 'email' | 'name'>&{
    password:string;
    password_confirmation:string;
}

export type LoginForm = Pick<RegisterForm, 'email' | 'password' >

export type SocialNetwork={
    id:number; 
    name:string;
    url:string;
    enabled:boolean;
}
export type devTreeLink= Pick<SocialNetwork , 'name' |'url' | 'enabled'>