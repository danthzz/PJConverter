import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';
import InputMoney from './inputMoney';

const Calculator = () => {
  const [cltSalary, setCltSalary] = useState(0.00);
  const [valeAlimentacao, setValeAlimentacao] = useState(0.00);
  const [valeTransporte, setValeTransporte] = useState(0.00);
  const [result, setResult] = useState(null);

  const handleChange = (setter) => (e) => {
    const value = parseFloat(e.target.value);
    setter(isNaN(value) ? 0.00 : value);
  };

  const calculatePJSalary = () => {
    const clt = cltSalary;
    const va = valeAlimentacao;
    const vt = valeTransporte;
    const fgts = clt * 0.08;

    const annualCltSalary = (clt + va + vt + fgts) * 12;
    const ferias = clt * (1 + 1 / 3);
    const decimoTerceiro = clt;
    const totalCltAnnual = annualCltSalary + ferias + decimoTerceiro;

    const monthlyEquivalent = totalCltAnnual / 12;
    const compensation = monthlyEquivalent * 2;
    const taxes = compensation * 0.1;
    const accountantCost = 300;

    const pjSalary = compensation - taxes - accountantCost;

    setResult({
      totalCltAnnual: totalCltAnnual.toFixed(2),
      monthlyEquivalent: monthlyEquivalent.toFixed(2),
      compensation: compensation.toFixed(2),
      taxes: taxes.toFixed(2),
      pjSalary: pjSalary.toFixed(2),
    });
  };

  const formatCurrency = (value) => {
    return parseFloat(value)
      .toFixed(2)
      .toString()
      .replace('.', ',')
      .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  return (
    <Container className="vh-100 d-flex justify-content-center align-items-center flex-column">
      <Card style={{ width: '100%', maxWidth: '800px' }}>
        <Card.Body>
          <h2 className="mb-4 text-center">Calculadora de Salário PJ</h2>
          <Form>
            <Form.Group as={Row} controlId="cltSalary">
              <Form.Label className='mb-4' column sm={3}>
                Salário Bruto CLT:
              </Form.Label>
              <Col sm={9}>
                <InputMoney
                  value={cltSalary}
                  onChange={handleChange(setCltSalary)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="valeAlimentacao">
              <Form.Label className='mb-4' column sm={3}>
                Vale Alimentação:
              </Form.Label>
              <Col sm={9}>
                <InputMoney
                  value={valeAlimentacao}
                  onChange={handleChange(setValeAlimentacao)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="valeTransporte">
              <Form.Label className='mb-4' column sm={3}>
                Vale Transporte ou Combustivel:
              </Form.Label>
              <Col sm={9}>
                <InputMoney
                  value={valeTransporte}
                  onChange={handleChange(setValeTransporte)}
                />
              </Col>
            </Form.Group>
            <Row>
              <Col className="d-flex justify-content-center">
                <Button variant="primary" onClick={calculatePJSalary} className="w-50">
                  Calcular Salário PJ
                </Button>
              </Col>
            </Row>
          </Form>
          {result && (
            <div className="mt-4">
              <h3>Resultados:</h3>
              <p>Salário Mensal CLT (fgts + ferias + beneficios + 13°): <b>R$ {formatCurrency(result.monthlyEquivalent)}</b></p>
              <p>Salário Bruto PJ: <b>R$ {formatCurrency(result.compensation)}</b></p>
              <p>Impostos PJ (10%): <b>R$ {formatCurrency(result.taxes)}</b></p>
              <p>Salário PJ Final: <b>R$ {formatCurrency(result.pjSalary)}</b></p>
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Calculator;
