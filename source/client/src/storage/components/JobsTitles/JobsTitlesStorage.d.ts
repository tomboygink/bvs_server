export declare class JobsTitlesStorage {
    modal_edit_jobstitle: boolean;
    jobs_titles: string;
    info: string;
    id: string;
    id_org: string;
    name: string;
    constructor();
    setModalEditJobsTitles(val: boolean): void;
    getModalEditJobsTitles(): boolean;
    setId(val: string): void;
    getId(): string;
    setJobsTitles(val: string): void;
    getJobsTitles(): string;
    setInfo(val: string): void;
    getInfo(): string;
    setIdOrg(val: string): void;
    getIdOrg(): string;
    setChangeJobs_Titles(name: string, value: any, _options?: any): Promise<void>;
}
