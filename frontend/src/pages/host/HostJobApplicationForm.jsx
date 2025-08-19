import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import React, { useState } from "react";

const HostJobApplicationForm = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    dateOfBirth: null,
    mobile: "",
    state: "",
    experience: "",
    linkedIn: "",
    resume: null,
    currentSalary: "",
    expectedSalary: "",
    joinTime: "",
    relocate: "",
    personality: "",
    skills: "",
    reason: "",
    willing: "",
    message: "",
    jobPosition: "",
    submissionDate: null,
    submissionTime: null,
    status: "",
    remarks: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormValues((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormValues((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleDateChange = (newValue) => {
    setFormValues((prev) => ({ ...prev, dateOfBirth: newValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);
    // Submit logic here
  };

  return (
    <div className="text-sm text-gray-800 w-full">
      <h3 className="text-lg font-semibold mb-6 text-center">
        APPLICATION FORM
      </h3>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <TextField
          label="Name"
          name="name"
          value={formValues.name}
          onChange={handleChange}
          fullWidth
          variant="standard"
        />
        <TextField
          label="Email"
          name="email"
          value={formValues.email}
          onChange={handleChange}
          fullWidth
          variant="standard"
        />

        <DatePicker
          label="Date of Birth"
          value={formValues.dateOfBirth}
          onChange={handleDateChange}
          slotProps={{
            textField: {
              fullWidth: true,
              variant: "standard", // This is enough
            },
          }}
        />

        <TextField
          label="Mobile Number"
          name="mobile"
          value={formValues.mobile}
          onChange={handleChange}
          fullWidth
          variant="standard"
        />
        <FormControl fullWidth variant="standard">
          <InputLabel>State</InputLabel>
          <Select
            name="state"
            value={formValues.state}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="Goa">Goa</MenuItem>
            <MenuItem value="Maharashtra">Maharashtra</MenuItem>
            <MenuItem value="Karnataka">Karnataka</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Experience (in years)"
          name="experience"
          value={formValues.experience}
          onChange={handleChange}
          fullWidth
          variant="standard"
        />
        <TextField
          label="Job Position"
          name="jobPosition"
          value={formValues.jobPosition}
          onChange={handleChange}
          fullWidth
          variant="standard"
        />
        <TextField
          label="Status"
          name="status"
          value={formValues.status}
          onChange={handleChange}
          fullWidth
          variant="standard"
        />
        <TextField
          label="Current Monthly Salary"
          name="currentSalary"
          value={formValues.currentSalary}
          onChange={handleChange}
          fullWidth
          variant="standard"
        />
        <TextField
          label="Expected Monthly Salary"
          name="expectedSalary"
          value={formValues.expectedSalary}
          onChange={handleChange}
          fullWidth
          variant="standard"
        />
        <TextField
          label="LinkedIn Profile URL"
          name="linkedIn"
          value={formValues.linkedIn}
          onChange={handleChange}
          fullWidth
          variant="standard"
        />
        <TextField
          variant="standard"
          fullWidth
          label="Upload Resume / CV"
          value={formValues.resume?.name || ""}
          InputProps={{
            readOnly: true,
          }}
          onClick={() => document.getElementById("resume-upload").click()}
        />
        <input
          type="file"
          name="resume"
          id="resume-upload"
          hidden
          onChange={handleChange}
          accept=".pdf,.doc,.docx"
        />

        <DatePicker
          label="Submission Date"
          value={formValues.submissionDate}
          onChange={handleDateChange}
          slotProps={{
            textField: {
              fullWidth: true,
              variant: "standard",
            },
          }}
        />
        <DatePicker
          label="Submission Time"
          value={formValues.submissionTime}
          onChange={handleDateChange}
          slotProps={{
            textField: {
              fullWidth: true,
              variant: "standard",
            },
          }}
        />
        <FormControl fullWidth variant="standard">
          <InputLabel>How Soon Can You Join?</InputLabel>
          <Select
            name="joinTime"
            value={formValues.joinTime}
            onChange={handleChange}
          >
            <MenuItem value="Immediately">Immediately</MenuItem>
            <MenuItem value="1 Week">1 Week</MenuItem>
            <MenuItem value="2 Weeks">2 Weeks</MenuItem>
            <MenuItem value="30 Days">30 Days</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth variant="standard">
          <InputLabel>Relocate to Goa</InputLabel>
          <Select
            name="relocate"
            value={formValues.relocate}
            onChange={handleChange}
          >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Who are you as a person?"
          name="personality"
          value={formValues.personality}
          onChange={handleChange}
          fullWidth
          multiline
          rows={3}
          className="md:col-span-2"
          variant="standard"
        />
        <TextField
          label="What skill set you have for the job you have applied?"
          name="skills"
          value={formValues.skills}
          onChange={handleChange}
          fullWidth
          multiline
          rows={3}
          className="md:col-span-2"
          variant="standard"
        />
        <TextField
          label="Why should we consider you for joining our company?"
          name="reason"
          value={formValues.reason}
          onChange={handleChange}
          fullWidth
          multiline
          rows={3}
          className="md:col-span-2"
          variant="standard"
        />
        <TextField
          label="Are you willing to bootstrap to join a growing startup?"
          name="willing"
          value={formValues.willing}
          onChange={handleChange}
          fullWidth
          multiline
          rows={3}
          className="md:col-span-2"
          variant="standard"
        />
        <TextField
          label="Personal Message"
          name="message"
          value={formValues.message}
          onChange={handleChange}
          fullWidth
          multiline
          rows={3}
          className="md:col-span-2"
          variant="standard"
        />
 
        <TextField
          label="Remarks"
          name="remarks"
          value={formValues.remarks}
          onChange={handleChange}
          fullWidth
          multiline
          rows={3}
          className="md:col-span-2"
          variant="standard"
        />

        <div className="md:col-span-2 text-center mt-2 pb-10">
          <Button
            variant="contained"
            type="submit"
            sx={{
              backgroundColor: "black",
              borderRadius: "9999px", // Equivalent to Tailwind's rounded-full
              px: 4,
              py: 1,
              "&:hover": {
                backgroundColor: "#333",
              },
            }}
          >
            SUBMIT
          </Button>
        </div>
      </form>
    </div>
  );
};

export default HostJobApplicationForm;
