import * as Yup from "yup";

export const validationSchema = Yup.object({
  firstName: Yup.string()
    .required("Vui lòng nhập họ")
    .min(2, "Họ phải có ít nhất 2 ký tự")
    .max(20, "Họ không được vượt quá 20 ký tự"),
  lastName: Yup.string()
    .required("Vui lòng nhập tên")
    .min(2, "Tên phải có ít nhất 2 ký tự")
    .max(20, "Tên không được vượt quá 20 ký tự"),
  address: Yup.string()
    .required("Vui lòng nhập địa chỉ")
    .min(5, "Địa chỉ phải có ít nhất 5 ký tự")
    .max(100, "Địa chỉ không được vượt quá 100 ký tự"),
  phone: Yup.string()
    .required("Vui lòng nhập số điện thoại")
    .matches(/^[0-9]+$/, "Số điện thoại chỉ chấp nhận các ký tự số")
    .min(10, "Số điện thoại phải có ít nhất 10 số")
    .max(11, "Số điện thoại không được vượt quá 11 số"),
});
