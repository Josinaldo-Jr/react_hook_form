import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  usernameYup: yup.string().required("Username is required"),
  emailYup: yup.string().email("Email format is not valid").required("Email is required"),
  channelYup: yup.string().required("Channel is required"),
  

})

let renderCount = 0;

type FormValues = {
  usernameYup: string;
  emailYup: string;
  channelYup: string;
};

export const YupForm = () => {

  const form = useForm<FormValues>({
    defaultValues: {
      usernameYup: "",
      emailYup: "",
      channelYup: "",
    },
    resolver: yupResolver(schema)
  });

  const { register, control, handleSubmit, formState } = form;
  const { errors} = formState;


  const onSubmit = (data: FormValues) => {
    console.log("Yup Form submitted", data);
  };

  renderCount++;
  return (
    <div>
      <h1>Yup Form ({renderCount / 2})</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-control">
          <label htmlFor="usernameYup">Username</label>
          <input type="text" id="username" {...register("usernameYup")} />
          <p className="error">{errors.usernameYup?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="emailYup">Email</label>
          <input type="email" id="email" {...register("emailYup")} />
          <p className="error">{errors.emailYup?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="channelYup">Channel</label>
          <input type="text" id="channel" {...register("channelYup")} />
          <p className="error">{errors.channelYup?.message}</p>
        </div>

        <button>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};
