import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

export default function Listing() {
  const [data_form, setFormData] = useState();
  const [loader, setLoader] = useState(false);
  const formData = JSON.stringify(data_form);
  const [count, setCount] = useState(0);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("http://localhost:1000/owner/job/list", {
      method: "POST",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:1000",
        "Content-Type": "application/json",
      },
      body: formData,
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setMsg(data))
      .finally(() => setLoader((loader) => false));
  }, [data_form]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    setLoader((loader) => true);
    setFormData(data);
  };

  return (
    <form
      method="post"
      className="w-full overflow-y-auto pb-5 scroll bg-white md:rounded-[2rem] rounded-r-none shadow-2xl p-3 gap-2 flex flex-col"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="text-[200%] flex justify-center items-center">
        <h2 className="font-bold text-center p-2 text-prime rounded-3xl font-sans w-full">
          Post a{" "}
          <span className="uppercase w-fit pb-1 text-[150%] relative bg-gradient-to-r from-cyan-400 to-green-400">
            <span className="bg-white">job</span>
          </span>
        </h2>
      </div>
      <div className="text-[150%] font-serif text-center">
        All * marked fields are mandatory.
      </div>
      <div
        className={`flex w-full flex-col p-2 gap-0 justify-start ims-center`}
      >
        {errors.name && (
          <div
            className={`bg-red-50 text-[100%] rounded-b-none font-mono text-center font-medium text-red-600 border-red-600 border-2 rounded-xl p-3 py-1`}
          >
            {errors.name.message}
          </div>
        )}
        Job Title *
        <input
          type="text"
          className={`w-full bg-[#f0f3fc] hover:shadow-lg md:hover:shadow-md ${
            errors.name
              ? "border-t-0 border-2 border-red-600 rounded-t-none"
              : ""
          } rounded-xl p-2 outline-none`}
          placeholder="Title of the Job"
          {...register("name", {
            required: "This field is required",
            maxLength: 80,
          })}
        />
      </div>
      <div
        className={`flex w-full flex-col p-2 gap-0 justify-start ims-center`}
      >
        {errors.location && (
          <div
            className={`bg-red-50 text-[100%] rounded-b-none font-mono text-center font-medium text-red-600 border-red-600 border-2 rounded-xl p-3 py-1`}
          >
            {errors.location.message}
          </div>
        )}
        Job Location *
        <input
          type="text"
          className={`w-full bg-[#f0f3fc] hover:shadow-lg md:hover:shadow-md ${
            errors.location
              ? "border-t-0 border-2 border-red-600 rounded-t-none"
              : ""
          } rounded-xl p-2 outline-none`}
          placeholder="At least mention country name"
          {...register("location", {
            required: "This field is required",
          })}
        />
      </div>
      <div className={`flex flex-col p-2 gap-0 justify-start`}>
        {errors.jobDescription && (
          <div
            className={`bg-red-50 text-[100%] rounded-b-none font-mono text-center font-medium text-red-600 border-red-600 border-2 rounded-xl p-3 py-1`}
          >
            {errors.jobDescription.message}
          </div>
        )}
        Description *
        <textarea
          className={`w-full bg-[#f0f3fc] hover:shadow-lg md:hover:shadow-md ${
            errors.jobDescription
              ? "border-t-0 border-2 border-red-600 rounded-t-none"
              : ""
          } rounded-xl p-2 outline-none`}
          placeholder="Descibe the job offer in minimum 10 words."
          {...register("jobDescription", {
            required: "This field is required",
            minLength: {
              value: 10,
              message: "Minimum of 10 words",
            },
          })}
        />
      </div>
      <div className={`flex flex-col p-2 gap-0 justify-start`}>
        {errors.requireMents && (
          <div
            className={`bg-red-50 text-[100%] rounded-b-none font-mono text-center font-medium text-red-600 border-red-600 border-2 rounded-xl p-3 py-1`}
          >
            {errors.requireMents.message}
          </div>
        )}
        Job Requirements *
        <textarea
          className={`w-full text-start h-[10rem] bg-[#f0f3fc] hover:shadow-lg md:hover:shadow-md ${
            errors.requireMents
              ? "border-t-0 border-2 border-red-600 rounded-t-none"
              : ""
          } rounded-xl p-2 outline-none`}
          placeholder="Skills, Experience etc"
          {...register("requireMents", {
            required: "This field is required",
            minLength: {
              value: 10,
              message: "Minimum of 10 words",
            },
          })}
        />
      </div>
      <div className={`flex flex-col p-2 gap-0 justify-start`}>
        {errors.offers && (
          <div
            className={`bg-red-50 text-[100%] rounded-b-none font-mono text-center font-medium text-red-600 border-red-600 border-2 rounded-xl p-3 py-1`}
          >
            {errors.offers.message}
          </div>
        )}
        What will you offer *
        <textarea
          className={`w-full min-h-[10rem] bg-[#f0f3fc] hover:shadow-lg md:hover:shadow-md ${
            errors.offers
              ? "border-t-0 border-2 border-red-600 rounded-t-none"
              : ""
          } rounded-xl p-2 outline-none`}
          placeholder="Compensation, Work life balance etc"
          {...register("offers", {
            required: "This field is required",
            minLength: {
              value: 10,
              message: "Minimum of 10 words",
            },
          })}
        />
      </div>
      <div className={`flex flex-col p-2 gap-0 justify-start`}>
        {errors.addInfo && (
          <div
            className={`bg-red-50 text-[100%] rounded-b-none font-mono text-center font-medium text-red-600 border-red-600 border-2 rounded-xl p-3 py-1`}
          >
            {errors.addInfo.message}
          </div>
        )}
        Additional Information
        <textarea
          className={`w-full bg-[#f0f3fc] hover:shadow-lg md:hover:shadow-md ${
            errors.addInfo
              ? "border-t-0 border-2 border-red-600 rounded-t-none"
              : ""
          } rounded-xl p-2 outline-none`}
          placeholder="Any visa criteria, Workplace requirements etc."
          {...register("addInfo", {
            minLength: { value: 10, message: "Minimum of 10 words" },
          })}
        />
      </div>
      <div className={`flex flex-col p-2 gap-0 justify-start`}>
        {errors.conInfo && (
          <div
            className={`bg-red-50 text-[100%] rounded-b-none font-mono text-center font-medium text-red-600 border-red-600 border-2 rounded-xl p-3 py-1`}
          >
            {errors.conInfo.message}
          </div>
        )}
        Contact Information
        <textarea
          className={`w-full bg-[#f0f3fc] hover:shadow-lg md:hover:shadow-md ${
            errors.conInfo
              ? "border-t-0 border-2 border-red-600 rounded-t-none"
              : ""
          } rounded-xl p-2 outline-none`}
          placeholder="Contact Information"
          {...register("conInfo", {
            minLength: { value: 10, message: "Minimum of 10 words" },
          })}
        />
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center flex-wrap flex-shrink text-[1005] text-prime">
        <h1 className="font-bold font-mono text-lg">It is* -</h1>
        <div className="flex justify-between h-full md:w-fit w-full gap-3 items-center">
          <label htmlFor="wfh">Remote Work</label>
          <input
            {...register("jobType", {
              required: "This field is required",
            })}
            type="radio"
            value="0"
            id="wfh"
          />
        </div>
        <div className="flex justify-between md:w-fit w-full gap-3 items-center">
          <label htmlFor="wfo">Office only</label>
          <input
            {...register("jobType", {
              required: "This field is required",
            })}
            type="radio"
            value="1"
            id="wfh"
          />
        </div>
        <div className="flex justify-between md:w-fit w-full gap-3 items-center">
          <label htmlFor="hybrid">Hybrid</label>
          <input
            {...register("jobType", {
              required: "This field is required",
            })}
            type="radio"
            value="2"
            id="hybrid"
          />
        </div>
      </div>
      {errors.jobType && (
        <div className="bg-red-50 font-mono text-red-700 border-red-600 w-fit border-2 rounded-xl p-3 py-1">
          {errors.jobType && errors.jobType.message}
        </div>
      )}
      {msg && count !== 0 && !loader && (
        <div className={`w-full flex justify-center text-center`}>
          {!msg.success ? (
            <div className="w-fit bg-yellow-200 shadow-2xl shadow-yellow-500 text-yellow-700 rounded-xl px-3 py-1">
              {msg?.msg ? msg?.msg : "Fill all data properly"}
            </div>
          ) : (
            <div className="w-fit bg-green-200 shadow-2xl shadow-emerald-500 text-green-700 rounded-xl px-3 py-1">
              Success!
            </div>
          )}
        </div>
      )}
      {loader && (
        <div className="w-full flex justify-center items-center">
          <img
            src="\assets\images\loading-gif.gif"
            className="h-10 w-10 animate-pulse"
            alt="loading..."
          />
        </div>
      )}
      {!loader && (
        <div className="w-full flex justify-center">
          <input
            type="submit"
            onClick={() => setCount(count + 1)}
            className="button md:w-fit w-full"
          />
        </div>
      )}
    </form>
  );
}
