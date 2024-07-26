using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace FI.AtividadeEntrevista.CPF
{
    public static class ValidadorCpf
    {
        public static bool ValidaCpf(string cpf)
        {

            if (cpf.Length != 11)
                return false;

            // Verifica se todos os dígitos são iguais
            if (new string(cpf[0], 11) == cpf)
                return false;


            var multiplicador1 = new int[9] { 10, 9, 8, 7, 6, 5, 4, 3, 2 };
            var multiplicador2 = new int[10] { 11, 10, 9, 8, 7, 6, 5, 4, 3, 2 };

            var tempCpf = cpf.Substring(0, 9);

            int soma = 0;

            for (int i = 0; i < 9; i++)
            {
                soma += int.Parse(tempCpf[i].ToString()) * multiplicador1[i];
            }
                
            int resto = soma % 11;

            if (resto < 2)
            {
                resto = 0;
            }                
            else
            {
                resto = 11 - resto;
            }               

            var digito = resto.ToString();

            tempCpf += digito;
            soma = 0;

            for (int i = 0; i < 10; i++)
            {
                soma += int.Parse(tempCpf[i].ToString()) * multiplicador2[i];
            }                

            resto = soma % 11;

            if (resto < 2)
            {
                resto = 0;
            }              
            else
            {
                resto = 11 - resto;
            }        
            
            digito += resto.ToString();

            return cpf.EndsWith(digito);
        }
    }
}
