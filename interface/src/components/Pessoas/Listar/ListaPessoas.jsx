import { useState, useEffect } from "react";
import PessoasRequests from "../../../fetch/PessoasRequests";
import ListaPessoasUtil from "./ListaPessoasUtil";
import { FaTrashCan } from "react-icons/fa6";
import { AiFillEdit } from "react-icons/ai";
import style from './ListaPessoas.module.css';

function ListaPessoas() {
    const [pessoas, setPessoas] = useState([]);
    const util = new ListaPessoasUtil();

    useEffect(() => {
        const fetchPessoas = async () => {
            try {
                const pessoas = await PessoasRequests.listarPessoas();
                setPessoas(pessoas);
            } catch (error) {
                console.error('Erro ao buscar alunos: ', error);
            }
        };

        fetchPessoas();
    }, []);

    const atualizar = () => {
        // atualizar
    }

    return (
        <>
            <div>
                {pessoas.length > 0 ? (
                    <table className={style.pTable}>
                        <thead className={style.pTableHead}>
                            <tr className={style.pTableHeadTr}>
                                <th hidden>ID</th>
                                <th>NOME</th>
                                <th>CPF</th>
                                <th>NASCIMENTO</th>
                                <th>TELEFONE</th>
                                <th>ENDEREÇO</th>
                                <th>ALTURA</th>
                                <th>PESO</th>
                            </tr>
                        </thead>
                        <tbody className={style.pTableBody}>
                            {pessoas.map(pessoa => (
                                <tr key={pessoa.id} className={style.pTableBodyTr}>
                                    <td hidden>{pessoa.id}</td>
                                    <td className={style.pTableBodyStrings}>{pessoa.nome}</td>
                                    <td>{util.formatarCPF(pessoa.cpf)}</td>
                                    <td>{util.formatarData(pessoa.data_nascimento)}</td>
                                    <td>{util.formatarTelefone(pessoa.telefone)}</td>
                                    <td className={style.pTableBodyStrings}>{pessoa.endereco}</td>
                                    <td>{util.formatarAltura(pessoa.altura)}</td>
                                    <td>{pessoa.peso}</td>
                                    <td>
                                        <FaTrashCan  onClick={() => alert('deletar')} className={style.pTableBodyButtons}/>
                                    </td>
                                    <td>
                                        <AiFillEdit  onClick={() => alert('atualizar')} className={style.pTableBodyButtons}/>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className={style.loadingParagrafer}>Carregando...</p>
                )}
            </div>
        </>
    );
}

export default ListaPessoas;