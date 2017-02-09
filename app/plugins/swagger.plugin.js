import swagger from  'hapi-swagger';

export const swaggerPlugin = { 
    register : swagger, 
    options: { 
        apiVersion: "1.0.0" 
    }
}