import ApiBaseUtilities from './ApiBaseUtilities';
import { API } from 'aws-amplify';
import StudentCreationJobResult from 'models/StudentCreationJobResult';

export default class UsersApiService {
  isPollingForJobCompletion = false;

  constructor(private apiBase: ApiBaseUtilities) {}

  createUsersByBatch = async (usersCsvFile: string) => {
    try {
      if (!usersCsvFile) return null;
      const formData = new FormData();
      formData.append('file', new File([new Blob([usersCsvFile])], 'students.csv'));
      return await API.post('admin', '/createStudents/', {
        body: usersCsvFile,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    } catch (err) {
      console.log(err);
    }
  };

  pollUserCreationJobStatus = async (
    jobId: string,
    onComplete: (jobResult: StudentCreationJobResult) => void,
    onError: () => void
  ) => {
    if (this.isPollingForJobCompletion) onError();

    this.isPollingForJobCompletion = true;
    try {
      for (let i = 0; i < this.apiBase.POLL_LIMIT; i++) {
        await new Promise((resolve) =>
          setTimeout(resolve, this.apiBase.POLL_INTERVAL)
        );

        const result = await this.checkUserCreationJobStatus(jobId);
        if (result.status === 'Failed' || result.status === 'Succeeded') {
          return onComplete(result);
        }
      }
      onError();
    } catch (err) {
      onError();
    } finally {
      this.isPollingForJobCompletion = false;
    }
  };

  checkUserCreationJobStatus = async (jobId: string) => {
    try {
      if (!jobId) return null;
      return (await API.get(
        'admin',
        '/createStudents/status/' + jobId,
        null
      )) as StudentCreationJobResult;
    } catch (err) {
      console.log(err);
    }
  };
}
