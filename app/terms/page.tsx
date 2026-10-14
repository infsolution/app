"use client";

export default function TermsPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Termos de Serviço</h1>
      <p className="text-gray-600 mb-4 text-sm text-gray-500">
        Última atualização: {new Date().toLocaleDateString("pt-BR")}
      </p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">1. Aceitação dos Termos</h2>
        <p className="text-gray-600 mb-4">
          Ao acessar e utilizar nossos serviços de integração com a WhatsApp Business API
          ("Serviços"), você concorda em cumprir e ficar vinculado a estes Termos de Serviço ("Termos").
          Se você não concordar com qualquer parte destes Termos, não deve utilizar os Serviços.
        </p>
        <p className="text-gray-600">
          Estes Termos constituem um acordo legalmente vinculativo entre você ("Usuário", "Cliente" ou "Você")
          e [Nome da Empresa] ("Empresa", "Nós" ou "Nosso").
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">2. Descrição dos Serviços</h2>
        <p className="text-gray-600 mb-4">
          Nossos Serviços fornecem uma interface para gerenciar a integração com a WhatsApp Business API,
          incluindo, mas não se limitando a:
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
          <li>Conexão e autenticação de contas WhatsApp Business (WABA)</li>
          <li>Envio de mensagens de texto e templates aprovados</li>
          <li>Criação, edição e gerenciamento de templates de mensagem</li>
          <li>Monitoramento de status de entrega e recebimento de mensagens</li>
          <li>Gerenciamento de números de telefone comerciais verificados</li>
        </ul>
        <p className="text-gray-600">
          Os Serviços atuam como intermediário técnico. O processamento real das mensagens
          ocorre através da infraestrutura da Meta Platforms, Inc.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">3. Requisitos de Elegibilidade</h2>
        <p className="text-gray-600 mb-4">
          Para utilizar os Serviços, você deve:
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
          <li>Ter pelo menos 18 anos de idade ou a maioridade legal em sua jurisdição</li>
          <li>Possuir uma conta WhatsApp Business verificada e aprovada pela Meta</li>
          <li>Ter autoridade legal para vincular a entidade representada aos Termos</li>
          <li>Cumprir todas as leis, regulamentos e políticas aplicáveis</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">4. Suas Responsabilidades</h2>
        <p className="text-gray-600 mb-4">Você é responsável por:</p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
          <li>Manter a confidencialidade de suas credenciais de acesso e tokens de API</li>
          <li>Garantir que todas as mensagens enviadas cumpram as <a href="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/guidelines" className="text-blue-600 hover:underline">Diretrizes de Templates do WhatsApp</a> e <a href="https://www.whatsapp.com/legal/business-policy" className="text-blue-600 hover:underline">Política Comercial do WhatsApp</a></li>
          <li>Obter consentimento válido dos destinatários antes de enviar mensagens (opt-in)</li>
          <li>Não enviar spam, conteúdo fraudulento, ilegal, ofensivo ou proibido</li>
          <li>Respeitar limites de taxa (rate limits) impostos pela Meta</li>
          <li>Manter suas informações de conta atualizadas e precisas</li>
          <li>Notificar-nos imediatamente sobre qualquer uso não autorizado de sua conta</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">5. Uso Proibido</h2>
        <p className="text-gray-600 mb-4">É estritamente proibido:</p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
          <li>Utilizar os Serviços para fins ilegais ou não autorizados</li>
          <li>Tentar acessar, modificar ou interferir nos sistemas de terceiros</li>
          <li>Fazer engenharia reversa, descompilar ou desmontar qualquer parte dos Serviços</li>
          <li>Transmitir vírus, malware ou código malicioso</li>
          <li>Coletar ou armazenar dados pessoais de terceiros sem consentimento</li>
          <li>Violar direitos de propriedade intelectual da Meta ou de terceiros</li>
          <li>Utilizar os Serviços para competir diretamente conosco ou criar produto similar</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">6. Propriedade Intelectual</h2>
        <p className="text-gray-600 mb-4">
          Todos os direitos, títulos e interesses nos Serviços, incluindo software, design,
          marcas, logotipos e documentação, são de nossa propriedade ou de nossos licenciadores.
          Estes Termos não concedem a você nenhum direito de propriedade intelectual, exceto
          a licença limitada, não exclusiva e revogável para usar os Serviços conforme aqui previsto.
        </p>
        <p className="text-gray-600">
          Você retém todos os direitos sobre o conteúdo que envia através dos Serviços
          (mensagens, templates, etc.), concedendo-nos apenas a licença necessária para
          processar e entregar esse conteúdo via WhatsApp Business API.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">7. Disponibilidade e Modificações</h2>
        <p className="text-gray-600 mb-4">
          Buscamos manter os Serviços disponíveis 24/7, mas não garantimos operação ininterrupta
          ou livre de erros. Podemos:
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
          <li>Realizar manutenções programadas com aviso prévio razoável</li>
          <li>Suspender temporariamente os Serviços por questões de segurança ou emergência</li>
          <li>Modificar, descontinuar ou substituir funcionalidades a qualquer momento</li>
          <li>Alterar estes Termos mediante notificação com 30 dias de antecedência</li>
        </ul>
        <p className="text-gray-600">
          O uso continuado dos Serviços após alterações constitui aceitação dos novos Termos.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">8. Limitação de Responsabilidade</h2>
        <p className="text-gray-600 mb-4">
          NA MÁXIMA EXTENSÃO PERMITIDA POR LEI, OS SERVIÇOS SÃO FORNECIDOS "COMO ESTÃO"
          E "CONFORME DISPONÍVEIS", SEM GARANTIAS DE QUALQUER TIPO, EXPRESSAS OU IMPLÍCITAS,
          INCLUINDO GARANTIAS DE COMERCIABILIDADE, ADEQUAÇÃO A FINALIDADE ESPECÍFICA
          E NÃO VIOLAÇÃO.
        </p>
        <p className="text-gray-600 mb-4">
          NÃO SEREMOS RESPONSÁVEIS POR DANOS INDIRETOS, INCIDENTAIS, ESPECIAIS,
          CONSEQUENCIAIS OU PUNITIVOS, INCLUINDO PERDA DE LUCROS, DADOS, USO,
          BOA-FÉ OU OUTRAS PERDAS INTANGÍVEIS, RESULTANTES DO USO OU INCAPACIDADE
          DE USAR OS SERVIÇOS.
        </p>
        <p className="text-gray-600">
          NOSSA RESPONSABILIDADE TOTAL NÃO EXCEDERÁ O VALOR PAGO POR VOCÊ NOS
          12 MESES ANTERIORES AO EVENTO QUE DEU CAUSA À REIVINDICAÇÃO, OU R$ 100,00,
          O QUE FOR MAIOR.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">9. Indenização</h2>
        <p className="text-gray-600 mb-4">
          Você concorda em indenizar, defender e isentar a Empresa, seus diretores, funcionários
          e agentes de quaisquer reivindicações, danos, perdas, responsabilidades, custos e despesas
          (incluindo honorários advocatícios razoáveis) decorrentes de:
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
          <li>Seu uso dos Serviços em violação destes Termos</li>
          <li>Sua violação de qualquer lei ou direito de terceiros</li>
          <li>Conteúdo que você transmite através dos Serviços</li>
          <li>Sua falha em obter consentimentos necessários dos destinatários</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">10. Rescisão</h2>
        <p className="text-gray-600 mb-4">
          Podemos rescindir ou suspender seu acesso aos Serviços imediatamente, sem aviso prévio,
          se você violar estes Termos. Você pode rescindir estes Termos a qualquer momento
          descontinuando o uso dos Serviços e solicitando exclusão de sua conta.
        </p>
        <p className="text-gray-600">
          As seções 6, 8, 9, 11, 12 e 13 sobreviverão à rescisão destes Termos.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">11. Conformidade com Políticas da Meta</h2>
        <p className="text-gray-600 mb-4">
          O uso dos Serviços está sujeito aos seguintes termos da Meta Platforms, Inc.:
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
          <li><a href="https://www.facebook.com/legal/terms" className="text-blue-600 hover:underline">Termos de Serviço do Facebook</a></li>
          <li><a href="https://developers.facebook.com/terms/" className="text-blue-600 hover:underline">Termos da Plataforma do Facebook</a></li>
          <li><a href="https://www.whatsapp.com/legal/business-policy" className="text-blue-600 hover:underline">Política Comercial do WhatsApp</a></li>
          <li><a href="https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/guidelines" className="text-blue-600 hover:underline">Diretrizes de Templates de Mensagem</a></li>
          <li><a href="https://developers.facebook.com/policy/" className="text-blue-600 hover:underline">Políticas da Plataforma para Desenvolvedores</a></li>
        </ul>
        <p className="text-gray-600">
          Em caso de conflito entre estes Termos e as políticas da Meta, as políticas da Meta
          prevalecerão no que se refere ao uso da WhatsApp Business API.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">12. Lei Aplicável e Foro</h2>
        <p className="text-gray-600 mb-4">
          Estes Termos serão regidos e interpretados de acordo com as leis da República Federativa
          do Brasil, sem consideração a princípios de conflito de leis.
        </p>
        <p className="text-gray-600">
          Fica eleito o foro da Comarca de [Sua Cidade/Estado], Brasil, para dirimir quaisquer
          controvérsias decorrentes destes Termos, com renúncia a qualquer outro, por mais
          privilegiado que seja.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">13. Disposições Gerais</h2>
        <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
          <li><strong>Integralidade:</strong> Estes Termos constituem o acordo integral entre as partes</li>
          <li><strong>Não renúncia:</strong> A falha em exercer qualquer direito não constitui renúncia</li>
          <li><strong>Divisibilidade:</strong> Se qualquer disposição for inválida, as demais permanecerão em vigor</li>
          <li><strong>Cessão:</strong> Não poderá ceder estes Termos sem nosso consentimento prévio por escrito</li>
          <li><strong>Força maior:</strong> Não seremos responsáveis por falhas decorrentes de eventos fora de nosso controle</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">14. Contato</h2>
        <p className="text-gray-600 mb-2">
          Para dúvidas sobre estes Termos, entre em contato:
        </p>
        <address className="not-italic text-gray-600">
          <p>E-mail: legal@seudominio.com</p>
          <p>Endereço: [Seu Endereço Comercial Completo]</p>
        </address>
      </section>

      <hr className="border-gray-200 my-8" />

      <p className="text-sm text-gray-500">
        Estes Termos regem o uso da interface de integração com a
        <a href="https://developers.facebook.com/docs/whatsapp" className="text-blue-600 hover:underline">WhatsApp Business API</a>.
        A Meta Platforms, Inc. não é parte destes Termos e não tem responsabilidade
        pela prestação de nossos Serviços de integração.
      </p>
    </div>
  );
}