import React from "react";
import CsvDropInput from "components/FileDropInput/CsvDropInput";
import SchoolIdInput from "./SchoolIdInput";
import { processCsvFile, CsvReadError, constructAwsUserImportJobCsv } from "models/StudentCsvInterpreter";
import { useDialogContext } from "services/DialogService";
import StudentEntry from "./models/StudentEntry";
import StudentsTable from "./StudentsTable";
import { useApiService } from "services/ApiService";
import StudentCreationJobResult from "models/StudentCreationJobResult";
import StudentCreationStatus from "./models/StudentCreationStatus";
import CreationDialog from "./CreationDialog";
import Scaffold from "components/Scaffold/Scaffold";
import LoaderButton from "components/LoaderButton";
import PageTitle from "components/PageTitle";

interface Props {}

const UsersPage = (props: Props) => {
  const dialogContext = useDialogContext();
  const apiService = useApiService();
  const [csvFile, setCsvFile] = React.useState<File | null>(null);
  const [parsedStudentData, setParsedStudentData] = React.useState<StudentEntry[]>(null);
  const [creationStatus, setCreationStatus] = React.useState(StudentCreationStatus.NONE);
  const [creationResult, setCreationResult] = React.useState<StudentCreationJobResult>(null);

  const handleSelectCsv = React.useCallback(async (file: File) => {
    if (!file) return;
    setCsvFile(file);

    try {
      console.log("Reading csv...");
      const studentsData = await processCsvFile(file);
      console.log(studentsData);

      setParsedStudentData(studentsData);
    } catch (err) {
      setParsedStudentData(null);

      let errorTitle = "";
      let errorMessage = "";

      switch (err) {
        case CsvReadError.INVALID_FILE:
          errorTitle = "File Read Error";
          errorMessage = "Please provide a valid CSV file.";
          break;
        case CsvReadError.INVALID_HEADER:
          errorTitle = "File Structure Error";
          errorMessage = "The CSV file does not have the required file headers.";
          break;
        case CsvReadError.INVALID_ROW:
          errorTitle = "File Structure Error";
          errorMessage = "The CSV file data might be malformed or have missing data. Please check again.";
          break;
        default:
          errorTitle = "File Read Error";
          errorMessage = "The CSV file could not be read.";
      }

      dialogContext.openDialog({
        title: errorTitle,
        body: errorMessage,
        buttons: [
          {
            label: "OK",
            variant: "primary",
            onClick: dialogContext.closeDialog,
          },
        ],
      });
    }
  }, []);

  const handleSubmitCreate = React.useCallback(
    async (event: any) => {
      event.preventDefault();
      if (!parsedStudentData || apiService.users.isPollingForJobCompletion) return;

      const csvString = constructAwsUserImportJobCsv(parsedStudentData);
      console.log(csvString);
      try {
        setCreationStatus(StudentCreationStatus.STARTED);

        const result = await apiService.users.createUsersByBatch(csvString);
        console.log(result);

        setCreationStatus(StudentCreationStatus.PENDING);

        apiService.users.pollUserCreationJobStatus(
          result.pendingJobId,
          (jobResult) => {
            setCreationResult(jobResult);
            if (jobResult.failedUsers > 0) {
              setCreationStatus(StudentCreationStatus.FAILED);
            } else {
              setCreationStatus(StudentCreationStatus.COMPLETED);
            }
          },
          () => setCreationStatus(StudentCreationStatus.ERROR)
        );
      } catch (err) {
        console.log(err);
      }
    },
    [parsedStudentData]
  );

  const closeCreationDialog = React.useCallback(() => {
    setCreationStatus(StudentCreationStatus.NONE);
  }, []);

  return (
    <Scaffold>
      <PageTitle>Create Users</PageTitle>
      <form onSubmit={handleSubmitCreate} noValidate>
        <p>
          Upload a csv file to create users. The username for each user will be created by (school
          ID)-(class)-(shortened version of student's name)
        </p>
        <p>
          Download the <a href="/students_csv_headers.csv">header here</a> and fill it up before putting it
          below.
        </p>
        <CsvDropInput id="upload-students-csv" title="" onFileInput={handleSelectCsv} />
        {Boolean(parsedStudentData) && (
          <>
            <StudentsTable students={parsedStudentData} />
            <LoaderButton block type="submit" isLoading={creationStatus !== StudentCreationStatus.NONE}>
              Create
            </LoaderButton>
          </>
        )}
      </form>
      <CreationDialog status={creationStatus} onClose={closeCreationDialog} result={creationResult} />
    </Scaffold>
  );
};

export default UsersPage;
