const formValidation = (value: string, field: string): [boolean | null, string] => {
    const phoneRegex = /^\+\d{2}(?: \d{3}){3}$/
    const priceRegex = /\.\d{1,2}$/
    const negotiatedArray = ["true", "false"]


    if (!value.length) {
        return [false, "This field is required"]
    }
    switch (field) {
        case "seller":
            if (value.length < 5) {
                return [false, "Seller is too short"]
            }
            if (value.length > 100) {
                return [false, "Seller is too long"]
            }
            break;
        case "title":
            if (value.length < 5) {
                return [false, "Title is too short"]
            }
            if (value.length > 100) {
                return [false, "Title is too long"]
            }
            break;
        case "sellerPhone":
            if (!phoneRegex.test(value)) {
                return [false, "Wrong phone number format. Should by +48111222333 or +48 111 222 333"]
            }
            break
        case "price":
            if (isNaN(parseFloat(value))) {
                return [false, "Wrong price"]
            }
            if (parseFloat(value) <= 0) {
                return [false, "Price is too low"]
            }
            if (!priceRegex.test(value)) {
                return [false, "Bad price format. Correct is 0.00"]
            }
            break
        case "image":
            console.log('title')
            break
        case "canNegotiate":
            if (!negotiatedArray.includes(value)) {
                return [false, "Wrong choice. Choose between true or false"]
            }
            break
        case "categoryId":
            if (isNaN(parseInt(value)) || parseInt(value) > 9 || parseInt(value) < 0 || value === '') {
                return [false, "Wrong choice"]
            }
            break
        case "description":
            if (value.length < 10) {
                return [false, "Description is too short"]
            }
            break
        default:
            return [null, 'Error. You done something odd.']
    }

    return [true, "Looks good!"]
}

export default formValidation