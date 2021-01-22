export default interface StudentCreationJobResult {
  status: string;
  importedUsers: number;
  skippedUsers: number;
  failedUsers: number;
  completionMessage: string;
}
