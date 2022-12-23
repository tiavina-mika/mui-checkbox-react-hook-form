import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Typography
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z.object({
  technos: z.array(z.string()).min(1, "Technos required")
});

interface Option {
  label: string;
  value: any;
}

const options: Option[] = [
  { label: "React JS", value: "reactjs" },
  { label: "Vue JS", value: "vuejs" },
  { label: "Angular", value: "angular" }
];

const defaultValues = {
  technos: []
};

const Form = () => {
  const {
    control,
    formState: { errors },
    handleSubmit
  } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: zodResolver(schema)
  });

  const customSubmit = (data) => console.log(JSON.stringify(data));

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }}
    >
      <form onSubmit={handleSubmit(customSubmit)}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <FormControl component="fieldset" error={!!errors?.technos}>
            <FormLabel component="legend">Technos</FormLabel>
            <FormGroup row>
              <Controller
                name="technos"
                control={control}
                render={({ field }: any): any =>
                  options.map((option: Option, index: number) => (
                    <FormControlLabel
                      {...field}
                      key={option.value + index}
                      label={option.label}
                      control={
                        <Checkbox
                          onChange={() => {
                            if (!field.value.includes(option.value)) {
                              field.onChange([...field.value, option.value]);
                              return;
                            }
                            const newOptions = field.value.filter(
                              (value: any) => value !== option.value
                            );
                            field.onChange(newOptions);
                          }}
                        />
                      }
                    />
                  ))
                }
              />
            </FormGroup>
            <FormHelperText>{errors?.technos?.message}</FormHelperText>
          </FormControl>
          <Box>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Box>
        </Box>
      </form>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <a href="https://www.linkedin.com/in/tiavina-michael-ralainirina/">
          <Typography>By Tiavina Michael Ralainirina</Typography>
        </a>
      </Box>
    </Box>
  );
};

export default Form;
