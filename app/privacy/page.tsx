"use client";

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Política de Privacidade</h1>
      <p className="text-gray-600 mb-4 text-sm text-gray-500">
        Última atualização: {new Date().toLocaleDateString("pt-BR")}
      </p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">1. Introdução</h2>
        <p className="text-gray-600 mb-4">
          Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos
          suas informações quando você utiliza nossos serviços de integração com a WhatsApp Business API.
          Estamos comprometidos em proteger sua privacidade e cumprir as leis aplicáveis, incluindo
          a LGPD (Lei Geral de Proteção de Dados) e o GDPR.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">2. Dados Coletados</h2>
        <p className="text-gray-600 mb-4">
          Podemos coletar as seguintes categorias de dados:
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
          <li><strong>Dados de identificação:</strong> Número de telefone WhatsApp, nome do perfil comercial</li>
          <li><strong>Dados de mensagens:</strong> Conteúdo das mensagens enviadas e recebidas, timestamps, status de entrega</li>
          <li><strong>Dados técnicos:</strong> Endereço IP, tipo de navegador, sistema operacional, logs de acesso</li>
          <li><strong>Dados de templates:</strong> Nomes, categorias, idiomas e componentes dos templates criados</li>
          <li><strong>Dados de autenticação:</strong> Tokens de acesso, códigos de autorização OAuth</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">3. Finalidade do Uso</h2>
        <p className="text-gray-600 mb-4">Utilizamos seus dados para:</p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
          <li>Fornecer e manter a funcionalidade de envio e recebimento de mensagens via WhatsApp</li>
          <li>Gerenciar templates de mensagem conforme as políticas da Meta</li>
          <li>Autenticar e autorizar acesso à WhatsApp Business API</li>
          <li>Monitorar qualidade do serviço e diagnosticar problemas técnicos</li>
          <li>Cumprir obrigações legais e regulatórias</li>
          <li>Melhorar nossos serviços e desenvolver novas funcionalidades</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">4. Compartilhamento de Dados</h2>
        <p className="text-gray-600 mb-4">
          Seus dados podem ser compartilhados com:
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
          <li><strong>Meta Platforms, Inc.:</strong> Para operação da WhatsApp Business API, conforme <a href="https://www.meta.com/legal/privacy-policy/" className="text-blue-600 hover:underline">Política de Privacidade da Meta</a></li>
          <li><strong>Provedores de infraestrutura:</strong> Serviços de hospedagem, banco de dados e monitoramento</li>
          <li><strong>Autoridades legais:</strong> Quando exigido por lei, ordem judicial ou regulamentação</li>
        </ul>
        <p className="text-gray-600">
          Não vendemos seus dados pessoais a terceiros.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">5. Retenção de Dados</h2>
        <p className="text-gray-600 mb-4">
          Mantemos seus dados apenas pelo tempo necessário para:
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
          <li>Cumprir as finalidades descritas nesta política</li>
          <li>Atender requisitos legais, contábeis ou de relatórios</li>
          <li>Resolução de disputas e aplicação de nossos acordos</li>
        </ul>
        <p className="text-gray-600">
          Mensagens e logs de entrega são retidos conforme políticas de retenção da Meta (geralmente 30 dias).
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">6. Seus Direitos</h2>
        <p className="text-gray-600 mb-4">
          Você tem os seguintes direitos sobre seus dados pessoais:
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
          <li><strong>Acesso:</strong> Solicitar cópia dos dados que mantemos sobre você</li>
          <li><strong>Retificação:</strong> Corrigir dados imprecisos ou incompletos</li>
          <li><strong>Exclusão:</strong> Solicitar remoção de seus dados (sujeito a obrigações legais)</li>
          <li><strong>Portabilidade:</strong> Receber seus dados em formato estruturado</li>
          <li><strong>Oposição:</strong> Opor-se ao processamento em certas circunstâncias</li>
          <li><strong>Revogação de consentimento:</strong> Retirar consentimento a qualquer momento</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">7. Segurança</h2>
        <p className="text-gray-600 mb-4">
          Implementamos medidas técnicas e organizacionais apropriadas para proteger seus dados,
          incluindo criptografia em trânsito (TLS 1.2+), autenticação baseada em tokens OAuth 2.0,
          controle de acesso baseado em funções e monitoramento de segurança contínuo.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">8. Transferências Internacionais</h2>
        <p className="text-gray-600 mb-4">
          Seus dados podem ser processados em servidores localizados fora do Brasil.
          Garantimos que tais transferências ocorram com salvaguardas adequadas, incluindo
          Cláusulas Contratuais Padrão da Comissão Europeia ou decisões de adequação.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">9. Alterações nesta Política</h2>
        <p className="text-gray-600 mb-4">
          Podemos atualizar esta política periodicamente. Notificaremos sobre alterações
          significativas através de nossos canais de comunicação ou mediante destaque em nosso site.
          Recomendamos revisar esta página regularmente.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">10. Contato</h2>
        <p className="text-gray-600 mb-2">
          Para exercer seus direitos ou tirar dúvidas sobre esta política, entre em contato:
        </p>
        <address className="not-italic text-gray-600">
          <p>E-mail: privacidade@seudominio.com</p>
          <p>Endereço: [Seu Endereço Comercial Completo]</p>
        </address>
      </section>

      <hr className="border-gray-200 my-8" />

      <p className="text-sm text-gray-500">
        Esta aplicação utiliza a <a href="https://developers.facebook.com/docs/whatsapp" className="text-blue-600 hover:underline">WhatsApp Business API</a>
        da Meta. O tratamento de dados pela Meta é regido pela
        <a href="https://www.whatsapp.com/legal/privacy-policy" className="text-blue-600 hover:underline">Política de Privacidade do WhatsApp</a>
        e pelos <a href="https://www.facebook.com/legal/terms" className="text-blue-600 hover:underline">Termos de Serviço do Facebook</a>.
      </p>
    </div>
  );
}