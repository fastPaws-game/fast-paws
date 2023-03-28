import baseApiConfigConnection from "../../constants/baseApiConfigConnection";

export type SignUpFormValues = {
    login: string,
    email: string,
    first_name: string,
    second_name: string,
    phone: string|number,
    password: string,
    repeated_password: string
}
//TODO создать общий сервис для отправки запросов к апи
export function registration(valuesForm:SignUpFormValues) {
    fetch(`${baseApiConfigConnection.url}/auth/signup`, {
        method: "POST",
        headers: baseApiConfigConnection.headers,
        body: JSON.stringify(valuesForm),
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                return res.json()
                    .then(data => {
                        const message = `Что-то пошло не так... ${data.message}`;
                        return Promise.reject(new Error(message));
                    });
            }
        })

        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        })
}
