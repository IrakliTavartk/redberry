import { useForm } from "react-hook-form";
import Label from "./Label";
import CheckIcon from "../../../../public/svgs/svgComponents/CheckIcon";

const CustomForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitted },
  } = useForm();

  const nameValue = watch("name", "");

  const onSubmit = (data: unknown) => {
    console.log("Form submitted with data:", data);

    // Handle form submission logic here
  };

  return (
    <form
      className="flex h-full flex-col justify-between"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex gap-[45px]">
        {/* Name */}
        <div className="flex flex-1 flex-col gap-1">
          <Label title="სახელი" htmlFor="name" isRequired />

          <input
            type="text"
            id="name"
            {...register("name", {
              required: "სახელის შეყვანა აუცილებელია",
              minLength: { value: 2, message: "მინიმუმ 2 სიმბოლო" },
              maxLength: { value: 255, message: "მაქსიმუმ 255 სიმბოლო" },
            })}
            onInput={(e) => {
              const sanitizedValue = e.currentTarget.value.replace(
                /[^a-zA-Zა-ჰ]/g,
                "",
              );
              setValue("name", sanitizedValue, { shouldValidate: true });
              // trigger("name");
            }}
            className="h-[45px] rounded-md border border-[#CED4DA] p-2.5"
          />

          <div className="flex flex-col gap-1 text-[10px]">
            {/* First Name Validation Messages */}
            <span
              className={`flex items-center gap-1 ${
                nameValue.length >= 2
                  ? "text-green-500"
                  : isSubmitted && nameValue < 2
                    ? "text-red-400"
                    : "text-[#6C757D]"
              }`}
            >
              <CheckIcon
                fill={
                  nameValue.length >= 2
                    ? "#00C951"
                    : isSubmitted && nameValue.length < 2
                      ? "red"
                      : "#6C757D"
                }
                width="16"
                height="16"
              />
              <p>მინიმუმ 2 სიმბოლო</p>
            </span>

            <span
              className={`flex items-center gap-1 ${
                nameValue.length > 255
                  ? "text-red-400"
                  : nameValue.length >= 2
                    ? "text-green-500"
                    : nameValue.length > 0
                      ? "text-red-400"
                      : "text-[#6C757D]"
              }`}
            >
              <CheckIcon
                fill={
                  nameValue.length > 255
                    ? "red"
                    : nameValue.length >= 2
                      ? "#00C951"
                      : nameValue.length > 0
                        ? "red"
                        : "#6C757D"
                }
                width="16"
                height="16"
              />
              <p>მაქსიმუმ 255 სიმბოლო</p>
            </span>
          </div>
        </div>

        {/* <div className="flex flex-1 flex-col gap-1">
            <Label title="გვარი" htmlFor="surname" isRequired />

            <input
              type="text"
              id="surname"
              {...register("surname", {
                required: "Name is required",
                minLength: { value: 2, message: "მინიმუმ 2 სიმბოლო" },
                maxLength: { value: 255, message: "მაქსიმუმ 255 სიმბოლო" },
              })}
              onInput={(e) => {
                const sanitizedValue = e.currentTarget.value.replace(/[^a-zA-Zა-ჰ]/g, "");
                setValue("surname", sanitizedValue, { shouldValidate: true });
                trigger("surname");
              }}
              className="h-[45px] rounded-md border border-[#CED4DA] p-2.5"
            />
            <div className="flex flex-col gap-1 text-[10px]">
              Last Name Validation Messages
              <span
                className={`flex items-center gap-1 ${
                  surnameValue.length >= 2
                    ? "text-green-500"
                    : isSubmitted && surnameValue.length < 2
                      ? "text-red-400"
                      : "text-[#6C757D]"
                }`}
              >
                <CheckIcon
                  fill={surnameValue.length >= 2 ? "#00C951" : isSubmitted && surnameValue.length < 2 ? "red" : "#6C757D"}
                  width="16"
                  height="16"
                />
                <p>მინიმუმ 2 სიმბოლო</p>
              </span>

              ✅ Maximum Length Validation
              <span
                className={`flex items-center gap-1 ${
                  surnameValue.length > 255
                    ? "text-red-400"
                    : surnameValue.length >= 2
                      ? "text-green-500"
                      : surnameValue.length > 0
                        ? "text-red-400"
                        : "text-[#6C757D]"
                }`}
              >
                <CheckIcon
                  fill={
                    surnameValue.length > 255
                      ? "red"
                      : surnameValue.length >= 2
                        ? "#00C951"
                        : surnameValue.length > 0
                          ? "red"
                          : "#6C757D"
                  }
                  width="16"
                  height="16"
                />
                <p>მაქსიმუმ 255 სიმბოლო</p>
              </span>
            </div>
          </div> */}
      </div>
    </form>
  );
};

export default CustomForm;
