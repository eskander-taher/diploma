import UsersDataTable from "./users/data-table";

export default async function Admin() {
	return (
		<div className="container mx-auto py-10">
			<UsersDataTable />
		</div>
	);
}
