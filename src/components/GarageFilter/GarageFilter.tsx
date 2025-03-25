import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';
import FlexGrid from '../layout/Grid';
import { IconAddItem, IconSearch, IconImportantTask } from '../../assets/svg';

import styles from './GarageFilter.module.scss';

// При рефакторе перенести фильтры в отдельный компонент, отсюда их убрать!!!

interface GarageFilterProps {
  title: string;
  totalItems: number;
  categories: number;
  filters: { name: string; options: string[] }[];
  onAddItem: (item: {
    name: string;
    category: string;
    vin: string;
    employee: string;
    motohours: number;
  }) => void;
}

const GarageFilter: React.FC<GarageFilterProps> = ({
  title,
  totalItems,
  filters,
  onAddItem,
}) => {
  const [selectedFilters, setSelectedFilters] = React.useState<{
    [key: string]: string;
  }>({});
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: '',
    category: '',
    vin: '',
    employee: '',
    motohours: '',
  });

  const handleFilterChange = (filterName: string, value: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddItem = () => {
    onAddItem({
      name: formData.name,
      category: formData.category,
      vin: formData.vin,
      employee: formData.employee,
      motohours: Number(formData.motohours),
    });
    setFormData({
      name: '',
      category: '',
      vin: '',
      employee: '',
      motohours: '',
    });
    setDialogOpen(false);
  };

  return (
    <>
      <Card
        style={{
          minWidth: '400px',
          backgroundColor: '#1C1C1C',
          color: '#fff',
          marginBottom: 2,
          borderRadius: '24px',
        }}
      >
        <CardContent>
          <FlexGrid className={styles.GarageFilter__Header}>
            <FlexGrid gap={12} marginBottom="2">
              <IconImportantTask />
              <FlexGrid direction="column" justifyContent="center">
                <Typography fontSize={14} color="#FBFBFC">
                  {title}
                </Typography>
                <Typography fontSize={12} color="#FBFBFC99">
                  Фильтры
                </Typography>
              </FlexGrid>
            </FlexGrid>
            <FlexGrid gap={8}>
              <IconButton
                style={{ border: '1px solid #FBFBFC0F' }}
                aria-label="add"
                size="large"
              >
                <IconSearch fontSize="inherit" />
              </IconButton>
              <IconButton
                style={{ border: '1px solid #FBFBFC0F' }}
                aria-label="add"
                size="large"
                onClick={() => setDialogOpen(true)}
              >
                <IconAddItem fontSize="inherit" />
              </IconButton>
            </FlexGrid>
          </FlexGrid>
          <FlexGrid gap={8}>
            <FlexGrid className={styles.GarageFilter__info} marginBottom="1.5">
              <Typography fontSize={13}>Всего техники</Typography>
              <Typography fontSize={32}>
                <strong>{totalItems}</strong>
              </Typography>
            </FlexGrid>
            <FlexGrid className={styles.GarageFilter__info} marginBottom="1.5">
              <Typography fontSize={13}>Категорий</Typography>
              <Typography fontSize={32}>
                <strong>{totalItems}</strong>
              </Typography>
            </FlexGrid>
          </FlexGrid>
          {filters.map((filter) => (
            <FormControl
              key={filter.name}
              fullWidth
              variant="outlined"
              sx={{ mb: 2 }}
              size="small"
            >
              <InputLabel sx={{ color: '#aaa' }}>{filter.name}</InputLabel>
              <Select
                value={selectedFilters[filter.name] || ''}
                onChange={(e) =>
                  handleFilterChange(filter.name, e.target.value)
                }
                label={filter.name}
                sx={{
                  color: '#fff',
                  '.MuiOutlinedInput-notchedOutline': { borderColor: '#666' },
                }}
              >
                {filter.options.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ))}
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth>
        <DialogTitle>Добавить новый элемент</DialogTitle>
        <DialogContent>
          <TextField
            label="Наименование"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Категория"
            value={formData.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
            fullWidth
            margin="dense"
          />
          <TextField
            label="VIN номер"
            value={formData.vin}
            onChange={(e) => handleInputChange('vin', e.target.value)}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Привязанный сотрудник"
            value={formData.employee}
            onChange={(e) => handleInputChange('employee', e.target.value)}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Моточасы"
            value={formData.motohours}
            onChange={(e) => handleInputChange('motohours', e.target.value)}
            fullWidth
            margin="dense"
            type="number"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="secondary">
            Отмена
          </Button>
          <Button onClick={handleAddItem} color="primary">
            Добавить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default GarageFilter;
