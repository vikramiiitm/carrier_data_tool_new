export const authHeader = () =>{
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.data.access){
        return { Authorization: "Bearer " + user.data.access };
    }
    else {
        return {}
    }
}