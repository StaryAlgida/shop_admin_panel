const formValidation = (value: string, field: string): string | null => {
  const phoneRegex = /^\+\d{2}(?: \d{3}){3}$/
  const priceRegex = /\.\d{1,2}$/
  const negotiatedArray = ["true", "false"]

  if (!value.length) {
    return "This field is required"
  }
  switch (field) {
    case "seller":
      if (value.length < 5) {
        return  "Seller is too short"
      }
      if (value.length > 100) {
        return  "Seller is too long"
      }
      break;
    case "title":
      if (value.length < 5) {
        return "Title is too short"
      }
      if (value.length > 100) {
        return "Title is too long"
      }
      break;
    case "sellerPhone":
      if (!phoneRegex.test(value)) {
        return "Wrong phone number format. Should by +48111222333 or +48 111 222 333"
      }
      break
    case "price":
      if (isNaN(parseFloat(value))) {
        return "Wrong price"
      }
      if (parseFloat(value) <= 0) {
        return "Price is too low"
      }
      if (!priceRegex.test(value)) {
        return "Bad price format. Correct is 0.00"
      }
      break
    case "image":
      console.log('title')
      break
    case "canNegotiate":
      if (!negotiatedArray.includes(value)) {
        return "Wrong choice. Choose between true or false"
      }
      break
    case "categoryId":
      if (isNaN(parseInt(value)) || parseInt(value) > 9 || parseInt(value) < 0 || value === '') {
        return "Wrong choice"
      }
      break
    case "description":
      if (value.length < 10) {
        return "Description is too short"
      }
      break
    default:
      return 'Error. You done something odd.'
  }

  return null
}

export default formValidation