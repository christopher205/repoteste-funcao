using FI.AtividadeEntrevista.DML;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FI.AtividadeEntrevista.BLL
{
    public class BoBeneficiario
    {
        /// <summary>
        /// Inclui um novo Beneficiario
        /// </summary>
        /// <param name="beneficiario">Objeto de Beneficiario</param>
        public long Incluir(DML.Beneficiario beneficiario)
        {
            DAL.Beneficiarios.DaoBeneficiarios cli = new DAL.Beneficiarios.DaoBeneficiarios();
            return cli.Incluir(beneficiario);
        }

        /// <summary>
        /// Altera um Beneficiario
        /// </summary>
        /// <param name="beneficiario">Objeto de Beneficiario</param>
        public void Alterar(DML.Beneficiario beneficiario)
        {
            DAL.Beneficiarios.DaoBeneficiarios cli = new DAL.Beneficiarios.DaoBeneficiarios();
            cli.Alterar(beneficiario);
        }

        /// <summary>
        /// Excluir o Beneficiario pelo id
        /// </summary>
        /// <param name="id">id do Beneficiario</param>
        /// <returns></returns>
        public void Excluir(long id)
        {
            DAL.Beneficiarios.DaoBeneficiarios cli = new DAL.Beneficiarios.DaoBeneficiarios();
            cli.Excluir(id);
        }

        /// <summary>
        /// Lista os Beneficiarios
        /// </summary>
        public List<DML.Beneficiario> Listar()
        {
            DAL.Beneficiarios.DaoBeneficiarios cli = new DAL.Beneficiarios.DaoBeneficiarios();
            return cli.Listar();
        }
        /// <summary>
        /// VerificaExistencia
        /// </summary>
        /// <param name="CPF"></param>
        /// <returns></returns>
        public bool VerificarExistencia(string CPF)
        {
            DAL.Beneficiarios.DaoBeneficiarios cli = new DAL.Beneficiarios.DaoBeneficiarios();
            return cli.VerificarExistencia(CPF);
        }
    }
}
