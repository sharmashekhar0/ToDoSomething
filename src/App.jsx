import { Container, Header, TodoForm, Todos } from "./components/index";
import { Provider } from "react-redux";
import store from "./store/store";
import { Outlet } from "react-router-dom";

function App() {
	return (
		<Provider store={store}>
			<Container className="min-h-screen bg-slate-900 py-10 px-20">
				<Header />
				<Outlet>
					<TodoForm />
					<Todos />
				</Outlet>
			</Container>
		</Provider>
	);
}

export default App;
