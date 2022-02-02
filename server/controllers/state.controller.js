const axios = require('axios');

exports.getAllStates = (req, res) => {

    req.headers = {
        'Accept': 'application/json',
        'api-token':'7Qb5S2un5MjKat3W3HJP7mCefCoaexV5aWT-oaNbBeylmZ-QugzAouvx8I7j1p0yo7I',
        'user-email': 'hrce231@gmail.com'
    }

    var requestOptions = {
        method: 'GET',
        headers: req.headers,
        redirect: 'follow'
    }

    axios.get('https://www.universal-tutorial.com/api/getaccesstoken', requestOptions).then(
        (response) => {
            const auth_token = response.data.auth_token;
            req.headers = {
                'Accept': 'application/json',
                'Authorization': `bearer ${auth_token}`
            }
        
            var requestOptions = {
                method: 'GET',
                headers: req.headers,
                redirect: 'follow'
            }
            axios.get('https://www.universal-tutorial.com/api/states/India', requestOptions).then(  
                (response) => {
                    res.send(response.data)
                }
            )                    
        
        },
         (error) => res.send(error)   
    );
}

exports.getAllCitiesByState = (req, res) => {

    req.headers = {
        'Accept': 'application/json',
        'api-token':'7Qb5S2un5MjKat3W3HJP7mCefCoaexV5aWT-oaNbBeylmZ-QugzAouvx8I7j1p0yo7I',
        'user-email': 'hrce231@gmail.com'
    }

    var requestOptions = {
        method: 'GET',
        headers: req.headers,
        redirect: 'follow'
    }

    var stateName = req.params.stateName;

    axios.get('https://www.universal-tutorial.com/api/getaccesstoken', requestOptions).then(
        (response) => {

            const auth_token = response.data.auth_token;

            req.headers = {
                'Accept': 'application/json',
                'Authorization': `bearer ${auth_token}`
            }

            var requestOptions = {
                method: 'GET',
                headers: req.headers,
                redirect: 'follow'
            }

            
            axios.get(`https://www.universal-tutorial.com/api/cities/${stateName}`, requestOptions).then(
                (response) => {
                    res.send(response.data);
                },
                 (error) => res.send(error)   
            );
        }
        )

}
