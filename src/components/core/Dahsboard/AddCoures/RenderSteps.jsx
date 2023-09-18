import { useSelector } from "react-redux"
import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm"
import CourseInformationForm from "./CourseInformation/CourseInformationForm"
import Stepper from "./CourseInformation/Stepper"
import PublishCourse from "./PublishCourse/index";

export default function RenderSteps() {

  const { step } = useSelector((state) => state.course)

  const stepper = [
    {
      id: 1,
      stepForm: <CourseInformationForm/>
    },
    {
      id: 2,
      stepForm: <CourseBuilderForm/>
    },
    {
      id: 3,
      stepForm: <PublishCourse/>
    },
  ]

  const filterStepper = stepper.filter((stepItem) => stepItem.id === step);

  return (
      // Render specific component based on current step
      <>
        {filterStepper.map((finalStep) => (
          <Stepper step={step} key={finalStep.id}>
            {finalStep.stepForm}
          </Stepper>
        ))}
      </>
  );
};