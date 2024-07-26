using FI.AtividadeEntrevista.BLL;
using FI.AtividadeEntrevista.CPF;
using FI.AtividadeEntrevista.DML;
using FI.WebAtividadeEntrevista.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;
using WebAtividadeEntrevista.Models;

namespace FI.WebAtividadeEntrevista.Controllers
{
    public class BeneficiarioController : Controller
    {
        // GET: Beneficiario
        [HttpPost]
        public ActionResult Listar()
        {
            var bo = new BoBeneficiario();
            try
            {
                var lista = bo.Listar();

                return Json(new { Result = "OK", Records = lista });
            }           
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        // POST: Beneficiario/Create
        [HttpPost]
        public ActionResult Create(BeneficiarioModel model)
        {
            var bo = new BoBeneficiario();

            if (!this.ModelState.IsValid)
            {
                List<string> erros = (from item in ModelState.Values
                                      from error in item.Errors
                                      select error.ErrorMessage).ToList();

                Response.StatusCode = 400;
                return Json(string.Join(Environment.NewLine, erros));
            }
            else
            {
                model.CPF = Regex.Replace(model.CPF, @"[^\d]", string.Empty);

                if (!ValidadorCpf.ValidaCpf(model.CPF))
                {
                    return Json(string.Join(Environment.NewLine, "Isto Não é um CPF valido. Insira um Cpf Valido"));
                }              
                if (bo.VerificarExistencia(model.CPF))
                {
                    return Json(string.Join(Environment.NewLine, "Este cpf já esta cadastrado! Digite outro cpf"));
                }

                model.Id = bo.Incluir(new Beneficiario()
                {
                    Nome = model.Nome,
                    CPF = model.CPF,
                    IdCliente = model.IdCliente
                });


                return Json("Cadastro efetuado com sucesso");
            }
        }

        // POST: Beneficiario/Edit/5
        [HttpPost]
        public ActionResult Editar(BeneficiarioModel model)
        {
            var bo = new BoBeneficiario();

            if (!this.ModelState.IsValid)
            {
                List<string> erros = (from item in ModelState.Values
                                      from error in item.Errors
                                      select error.ErrorMessage).ToList();

                Response.StatusCode = 400;
                return Json(string.Join(Environment.NewLine, erros));
            }
            else
            {

                model.CPF = Regex.Replace(model.CPF, @"[^\d]", string.Empty);

                if (!ValidadorCpf.ValidaCpf(model.CPF))
                {
                    return Json(string.Join(Environment.NewLine, "Isto Não é um CPF valido. Insira um Cpf Valido"));
                }
                if (bo.VerificarExistencia(model.CPF))
                {
                    return Json(string.Join(Environment.NewLine, "Este cpf já esta cadastrado! Digite outro cpf"));
                }

                bo.Alterar(new Beneficiario()
                {
                    Nome = model.Nome,
                    CPF = model.CPF,
                    Id = (int)model.Id
                    
                });

                return Json("Cadastro alterado com sucesso");
            }
        }

        // POST: Beneficiario/Delete/5
        [HttpPost]
        public ActionResult Deletar(long id)
        {
            var bo = new BoBeneficiario();

            bo.Excluir(id);

            return Json("Cadastro excluido com sucesso");
        }
    }
}
