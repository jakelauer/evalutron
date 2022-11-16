export interface Stakeholder
{
    id: string;
    name: string;
    type: "group" | "individual";
    email: string;
    weight: number;
}