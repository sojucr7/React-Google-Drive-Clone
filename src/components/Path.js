import { Link } from "react-router-dom"
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getPath} from '../utils/filters'
function Path() {
    let { id } = useParams();
    const paths = useSelector((state) => state.pathSlice.paths);
    const parentPath = getPath(paths, id) ?? [];
    return (
        <>
            <nav aria-label="breadcrumb" className="p-2">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">ROOT</Link></li>   
                    {parentPath.map(function (path, i) {                        
                        return (<li className="breadcrumb-item" key={path.id}><Link to={`/folders/${path.id}`}>{path.name}</Link></li>);
                    })}
                </ol>
            </nav>
        </>
    );
}

export default Path;