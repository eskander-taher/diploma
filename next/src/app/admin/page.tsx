import axios from "axios";

import { columns } from "./users/columns";
import { DataTable } from "./users/data-table";

export default async function Admin() {
	const res = await axios.get("http://localhost:3001/users");

	return (
		<div className="container mx-auto py-10">
			<DataTable columns={columns} data={res.data.data} />
		</div>
	);
}
