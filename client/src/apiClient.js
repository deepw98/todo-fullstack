const API_BASE_URL='http://localhost:3000/api/v1/tasks';

const apiClient = async (endpoint,options={})=>{
    const token = localStorage.getItem('token');
    const headers={
        'Content-Type':'application/json',
        ...options.headers
    };

    if(token){
        headers['Authorization'] = `Bearer ${token}`;
    }else if(endpoint !== '/auth' && endpoint !='/users'){
        console.error('Attempted to access protected route without token');
    }

    const config={
        ...options,
        headers,
    }

    const url=`${API_BASE_URL}${endpoint}`;

    const response = await fetch(url,config);

    if(response.status===401){
        console.error('Token invalid or expired.Please login again');
        localStorage.removeItem('token');
        //window.location.reload();
    }
    return response;
}

export default apiClient;
