import { url } from "./useAuth";
export const HandleLogin = async (username:string, password:string, nagivate:any) => {
    // console.log('trying to login');
    // console.log(`username = ${username} password = ${password}`);
    
    const response = await fetch(`${url}/api/login/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    });
    
    const data = await response.json();
    // console.log(data);

    if(data.error){
        console.error("login failed");
    }else if (data.message) {
        alert("login successful");
        localStorage.setItem('token', data.token);
        nagivate('/');
        
    }else {
        console.log('something unexcepted went wrong');
        
    }

}