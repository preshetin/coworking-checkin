import * as Yup from 'yup';

const TicketSchema = Yup.object().shape({
  visitorId: Yup.string()
    .notOneOf(['empty'])
    .required('Required'),
  hoursCapacity: Yup.number()
    .required('Required'),
});

export default TicketSchema;
