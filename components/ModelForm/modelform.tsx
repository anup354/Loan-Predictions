import React, { useState } from "react";
import Select from "react-select";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

type FormValues = {
  applicant_name: String;
  price: number;
  free: string;
  tag: string;
  category: string;
};

const Modelform = () => {
  const [isDependent, setIsDependent] = useState("1");

  const menuItems = [
    "SLC",
    "+2",
    "Bachelor",
    "Master",
    "Phd",
    "ungraduated",
   
  ];
  const propertyItems = [
    "Rural",
    "Urban",
    "Semi-urban",
  ];

  const [selectedItem, setSelectedItem] = useState({
    item: null,
    idx: null,
  });

  const [state, setState] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setError,
    setValue,
    getValues,
    clearErrors,
    resetField,

    formState: { errors },
  } = useForm<FormValues>();

  // Function to handle the radio button change event
  const handleRadioButtonChange = (event: any) => {
    setIsDependent(event.target.value === "1");
  };
  const radios = [
    {
      name: "Male",
    },
    {
      name: "Female",
    },
  ];

  return (
    <>
      <main className="max-w-screen-xl mt-12 mx-auto px-4 md:px-8">
        <div className=" space-y-10 px-4 lg:px-36 text-gray-600  w-full ">
          <div className="text-center">
            <div className="mt-5 space-y-2">
              <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
                Loan Approval Prediction Form
              </h3>
            </div>
          </div>
          <div className="bg-white shadow p-4 py-6 sm:p-6 sm:rounded-lg">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
              <div>
                <label className="font-medium">Applicant Name</label>
                <input
                  {...register("applicant_name", {
                    required: true,
                  })}
                  type="text"
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  //   className={
                  //     errors?.name
                  //       ? "text-xs border p-3 rounded mt-3 border-red-600 bg-red-50 "
                  //       : "text-xs border border-gray-300 p-3 rounded mt-3 focus:border-[#7065d4] hover:border-[#7065d4]"
                  //   }
                />
                {errors?.applicant_name?.type === "required" && (
                  <p className="text-red-600 font-main text-sm mt-1">
                    This field is required
                  </p>
                )}
              </div>
              {/* gender */}
              <div>
                <label className="font-medium">Gender</label>
                <div className="mt-2 flex w-full gap-2 md:gap-12  justify-between">

                  {radios.map((item, idx) => (
                    <div key={idx} className="w-full ">
                      <label htmlFor={item.name} className="block relative">
                        <input
                          id={item.name}
                          type="radio"
                          defaultChecked={idx == 1 ? true : false}
                          name="payment"
                          className="sr-only peer"
                        />
                        <div className="flex  p-4 cursor-pointer rounded-lg border bg-white shadow-sm ring-indigo-600 peer-checked:ring-2 duration-200">
                          <div>
                            <h3 className="leading-none text-gray-800 font-medium ">
                              {item.name}
                            </h3>
                          </div>
                        </div>
                        <div className="absolute top-4 right-4 flex-none flex items-center justify-center w-4 h-4 rounded-full border peer-checked:bg-indigo-600 text-white peer-checked:text-white duration-200">
                          <svg className="w-2.5 h-2.5" viewBox="0 0 12 10">
                            <polyline
                              fill="none"
                              stroke-width="2px"
                              stroke="currentColor"
                              stroke-dasharray="16px"
                              points="1.5 6 4.5 9 10.5 1"
                            ></polyline>
                          </svg>
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              {/* married status */}
              <div className="mt-2">
                <label className="font-medium">Married</label>
                <div className="flex mt-2 text-lg">
                  <div className="">
                    <input type="radio" name="marry" value="1" defaultChecked />
                    <span className="ml-2">Yes</span>
                  </div>
                  <div className=" ml-4 text-lg">
                    <input type="radio" name="marry" value="0" />
                    <span className="ml-2">No</span>
                  </div>
                </div>
              </div>
              {/* dependents */}
              <div className="mt-2">
                <label className="font-medium">Dependent</label>
                <div className="flex mt-2 text-lg">
                  <div className="">
                    <input
                      type="radio"
                      name="dependent"
                      value="1"
                      onChange={handleRadioButtonChange}
                      defaultChecked
                    />
                    <span className="ml-2">Yes</span>
                  </div>
                  <div className=" ml-4 text-lg">
                    <input
                      type="radio"
                      name="dependent"
                      value="0"
                      onChange={handleRadioButtonChange}
                    />
                    <span className="ml-2">No</span>
                  </div>
                </div>

                {isDependent && (
                  <div className="mt-3">
                    <label className="font-medium">Dependent Name</label>
                    <input
                      type="text"
                      required
                      className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                    />
                  </div>
                )}
              </div>
              {/* education */}
              <div>
                <label className="font-medium">Education</label>
                <div className="label-button flex items-center gap-1 pt-2 rounded-lg ">
                  <Controller
                    {...register("category", {
                      required: "category", // Check if category is empty
                    })}
                    name="category"
                    control={control}
                    render={({ field }) => (
                      <Select
                        // styles={selectStyle}
                        isClearable
                        className="w-full rounded-lg text-xs shadow-sm"
                        options={menuItems.map((item) => ({
                          value: item,
                          label: item,
                        }))}
                        {...field}
                        // value={category}

                        // placeholder="uncategorized"
                        // onChange={(e: any) => {
                        //   setCategory(e?.value);
                        //   field.onChange(e);
                        // }}
                      />
                    )}
                  />
                </div>
                {errors?.category?.type === "required" && (
                  <p className="text-red-600 font-main text-sm mt-1">
                    This field is required
                  </p>
                )}
              </div>

              {/* self employed*/}
              <div className="mt-2">
                <label className="font-medium">Self Employed</label>
                <div className="flex mt-2 text-lg">
                  <div className="">
                    <input
                      type="radio"
                      name="Employed"
                      value="1"
                      defaultChecked
                    />
                    <span className="ml-2">Yes</span>
                  </div>
                  <div className=" ml-4 text-lg">
                    <input type="radio" name="Employed" value="0" />
                    <span className="ml-2">No</span>
                  </div>
                </div>
              </div>
              {/* applicant income */}
              <div>
                <label className="font-medium">Applicant Income</label>
                <input
                  {...register("applicant_name", {
                    required: true,
                  })}
                  type="text"
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  //   className={
                  //     errors?.name
                  //       ? "text-xs border p-3 rounded mt-3 border-red-600 bg-red-50 "
                  //       : "text-xs border border-gray-300 p-3 rounded mt-3 focus:border-[#7065d4] hover:border-[#7065d4]"
                  //   }
                />
                {errors?.applicant_name?.type === "required" && (
                  <p className="text-red-600 font-main text-sm mt-1">
                    This field is required
                  </p>
                )}
              </div>
              {/* cp-applicant income */}
              <div>
                <label className="font-medium">Coapplicant Income</label>
                <input
                  {...register("applicant_name", {
                    required: true,
                  })}
                  type="text"
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  //   className={
                  //     errors?.name
                  //       ? "text-xs border p-3 rounded mt-3 border-red-600 bg-red-50 "
                  //       : "text-xs border border-gray-300 p-3 rounded mt-3 focus:border-[#7065d4] hover:border-[#7065d4]"
                  //   }
                />
                {errors?.applicant_name?.type === "required" && (
                  <p className="text-red-600 font-main text-sm mt-1">
                    This field is required
                  </p>
                )}
              </div>
              {/* Loan amount */}
              <div>
                <label className="font-medium">Loan amount</label>
                <input
                  {...register("applicant_name", {
                    required: true,
                  })}
                  type="text"
                  placeholder="Loan amount (in thousands)"
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  //   className={
                  //     errors?.name
                  //       ? "text-xs border p-3 rounded mt-3 border-red-600 bg-red-50 "
                  //       : "text-xs border border-gray-300 p-3 rounded mt-3 focus:border-[#7065d4] hover:border-[#7065d4]"
                  //   }
                />
                {errors?.applicant_name?.type === "required" && (
                  <p className="text-red-600 font-main text-sm mt-1">
                    This field is required
                  </p>
                )}
              </div>
              {/* Loan_Amount_Term */}
              <div>
                <label className="font-medium">Loan Amount Term</label>
                <input
                  {...register("applicant_name", {
                    required: true,
                  })}
                  type="text"
                  placeholder="Terms of loan (in months)"
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  //   className={
                  //     errors?.name
                  //       ? "text-xs border p-3 rounded mt-3 border-red-600 bg-red-50 "
                  //       : "text-xs border border-gray-300 p-3 rounded mt-3 focus:border-[#7065d4] hover:border-[#7065d4]"
                  //   }
                />
                {errors?.applicant_name?.type === "required" && (
                  <p className="text-red-600 font-main text-sm mt-1">
                    This field is required
                  </p>
                )}
              </div>
              {/* Credit_History */}
              <div>
                <label className="font-medium">Credit History</label>
                <input
                  {...register("applicant_name", {
                    required: true,
                  })}
                  type="text"
                  placeholder="Credit history of individual’s repayment of their debts"
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  
                />
                {errors?.applicant_name?.type === "required" && (
                  <p className="text-red-600 font-main text-sm mt-1">
                    This field is required
                  </p>
                )}
              </div>

              {/* Property_Area */}
              <div>
                <label className="font-medium">Property Area</label>
                <div className="label-button flex items-center gap-1 pt-2 rounded-lg ">
                  <Controller
                    {...register("category", {
                      required: "category", // Check if category is empty
                    })}
                    name="category"
                    control={control}
                    render={({ field }) => (
                      <Select
                        // styles={selectStyle}
                        isClearable
                        className="w-full rounded-lg text-xs shadow-sm"
                        options={propertyItems.map((item) => ({
                          value: item,
                          label: item,
                        }))}
                        {...field}
                        // value={category}

                        // placeholder="uncategorized"
                        // onChange={(e: any) => {
                        //   setCategory(e?.value);
                        //   field.onChange(e);
                        // }}
                      />
                    )}
                  />
                </div>
                

                {errors?.category?.type === "required" && (
                  <p className="text-red-600 font-main text-sm mt-1">
                    This field is required
                  </p>
                )}
              </div>

              <button className=" px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
                Predict
              </button>
            </form>
            
          </div>
        </div>
      </main>
    </>
  );
};

export default Modelform;
