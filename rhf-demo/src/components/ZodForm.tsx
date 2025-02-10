import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";


const schema = z.object({
  usernameZod: z.string().nonempty("Username is required"),
  emailZod: z.string().nonempty("Email is required").email("Email format is not valid"),
  channelZod: z.string().nonempty("Channel is required"),
})

let renderCount = 0;

type FormValues = {
  usernameZod: string;
  emailZod: string;
  channelZod: string;
};

export const ZodForm = () => {

  const form = useForm<FormValues>({
    defaultValues: {
      usernameZod: "",
      emailZod: "",
      channelZod: "",
    },
    resolver: zodResolver(schema)
  });

  const { register, control, handleSubmit, formState } = form;
  const { errors} = formState;


  const onSubmit = (data: FormValues) => {
    console.log("Zod Form submitted", data);
  };

  renderCount++;
  return (
    <div>
      <h1>Zod Form ({renderCount / 2})</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-control">
          <label htmlFor="usernameZod">Username</label>
          <input type="text" id="username" {...register("usernameZod")} />
          <p className="error">{errors.usernameZod?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="emailZod">Email</label>
          <input type="email" id="email" {...register("emailZod")} />
          <p className="error">{errors.emailZod?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="channelZod">Channel</label>
          <input type="text" id="channel" {...register("channelZod")} />
          <p className="error">{errors.channelZod?.message}</p>
        </div>

        <button>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};
